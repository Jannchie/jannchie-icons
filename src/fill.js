// 实心（fill）变体的几何：把描边图标式的路径描述算成一条只有填充、没有描边的 path
// 图标文件额外导出 fill（和默认导出同样的参数 { radius, stroke, weight, sharp }），返回路径数组，按顺序叠加：
// - { d, fill: true }：实心块。墨迹是闭合区域本身加上沿边外扩半个线宽（和描边版 fill 路径的外缘一致，外缘按 docs/design.md 固定）
// - 字符串或普通 { d }：一条线，墨迹就是描边的形状（线宽、点、detail、badge、thin、round 的规则和描边版一样）
// - { d, knock: true }：挖空。从已经叠上去的墨迹里减掉这条线描边的形状（加 fill: true 时减掉闭合区域 + 半线宽外扩）
// - { d, knock: true, fill: true, exact: true }：挖掉闭合区域本身，不外扩
// - { d, knock: true, clear: g }：让位。挖掉这条线的墨迹再外扩 g，闭合的子路径连内部一起挖（系列图标的角标四周留缝）
// 后面的路径作用在前面的结果上：先铺实心、再挖空、再在挖空里放回小点，按顺序写就行
// tone：双色变体的角色（见 tone.js），同一角色的墨迹合成一条 path；挖空对所有角色都生效
//
// 线条的描边形状、并集和差集都交给 Clipper2：曲线先打散成细折线，算完以后把折线里成串落在同一个圆上的点重新拟合成圆弧（A），
// 输出的路径不会是几百个点的折线。Clipper2 只在预览站和构建时用：发布包里放预先算好的结果（见 scripts/build-packages.mjs），
// 核心包不带这个依赖——所以 render.js 不直接导入这个模块，由预览站和构建脚本调用 setSolidify 注入
import { Clipper, ClipType, EndType, FillRule, JoinType } from '@countertype/clipper2-ts'
import { samples, segments } from './clip'
import { dotSize, dotWidth, minify, widthOf } from './svg'

// Clipper 的小数精度（位数）和圆角的弦高误差：误差 0.005 在 24 网格上放大到 512px 也只有 0.1px
const PRECISION = 4
const ARC_TOLERANCE = 0.005
// 曲线打散：直线不打散，曲线切成弦高不超过 SAGITTA 的小段，步长限制在 MIN_STEP_LENGTH–MAX_STEP_LENGTH 之间
const SAGITTA = 0.002
const MIN_STEP_LENGTH = 0.05
const MAX_STEP_LENGTH = 0.4
// 尖角模式的斜接上限：和描边版的 stroke-miterlimit 一致
const MITER_LIMIT = 2

// 布尔运算一律走 booleanOpD：Clipper.unionD(subject, fillRule) 这个重载不收精度参数，会悄悄退回两位小数
const boolean = (type, subject, clip) => Clipper.booleanOpD(type, subject, clip, FillRule.NonZero, PRECISION)

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1])

// 路径 → 子路径折线 [{ pts, closed }]；点（零长度路径）是只有一个点的折线
function flatten(d) {
  return segments(d).map(({ start, segs, closed }) => {
    const pts = [start]
    for (const s of segs) {
      let n = 1
      if (s.kind === 'curve') {
        // 按弯曲程度定步长：弦高 c²/8r 不超过 SAGITTA，r 按粗采样里转得最急的一处估计（贝塞尔各处弯曲不同，取最急的）。
        // 大圆不用切得和小圆一样碎——Clipper 的耗时和点数成正比
        const rough = samples(s, 8)
        let [len, minR] = [0, Infinity]
        for (let k = 1; k < rough.length; k++) {
          const l = dist(rough[k], rough[k - 1])
          len += l
          if (k > 1) {
            const [ax, ay, bx, by] = [rough[k - 1][0] - rough[k - 2][0], rough[k - 1][1] - rough[k - 2][1], rough[k][0] - rough[k - 1][0], rough[k][1] - rough[k - 1][1]]
            const turnAngle = Math.abs(Math.atan2(ax * by - ay * bx, ax * bx + ay * by))
            if (turnAngle > 1e-9)
              minR = Math.min(minR, l / turnAngle)
          }
        }
        const step = Math.min(MAX_STEP_LENGTH, Math.max(MIN_STEP_LENGTH, Math.sqrt(8 * minR * SAGITTA)))
        n = Math.min(512, Math.max(4, Math.ceil(len / step)))
      }
      for (const p of samples(s, n).slice(1)) {
        if (dist(p, pts.at(-1)) > 1e-6)
          pts.push(p)
      }
    }
    // 终点回到起点的（写了 Z，或者像 circle() 那样两段圆弧首尾相接）当作闭合：重复的终点会让 Clipper 在零长度边上多出一个转角
    const ring = pts.length > 2 && dist(pts[0], pts.at(-1)) < 1e-6
    if (ring)
      pts.pop()
    return { pts: pts.map(([x, y]) => ({ x, y })), closed: closed || ring }
  })
}

// 一条路径的墨迹（PathsD）
function inkOf(item, stroke, sharp) {
  const dot = dotSize(item)
  // clear：挖空时再往外多让 clear 的间隙（角标四周的留白）
  // exact：闭合区域原样使用，不外扩（形状已经按线宽算好，比如两端平行于外框的缝）
  const h = item.exact ? 0 : (dot ? dotWidth(item, stroke) : widthOf(item, stroke)) / 2 + (item.clear ?? 0)
  const round = !sharp || item.round
  const join = round ? JoinType.Round : JoinType.Miter
  const inflate = (paths, end) => Clipper.inflatePathsD(paths, h, join, end, MITER_LIMIT, PRECISION, ARC_TOLERANCE)
  const subs = flatten(item.d)
  if (item.fill) {
    // 实心块：先按 nonzero 合并成干净的区域（外轮廓正向、洞反向），再整体外扩半个线宽
    const area = boolean(ClipType.Union, subs.filter(s => s.pts.length > 2).map(s => s.pts), null)
    return h ? inflate(area, EndType.Polygon) : area
  }
  const closed = subs.filter(s => s.closed && s.pts.length > 2).map(s => s.pts)
  const open = subs.filter(s => !(s.closed && s.pts.length > 2)).map(s => s.pts)
  const ink = [
    // clear 的闭合子路径连同内部一起让开：钟面、云朵这类角标里面不留主体的颜色
    ...(closed.length ? item.clear != null ? inflate(boolean(ClipType.Union, closed, null), EndType.Polygon) : inflate(closed, EndType.Joined) : []),
    ...(open.length ? inflate(open, round ? EndType.Round : EndType.Square) : []),
  ]
  return item.sweep ? swept(ink, item.sweep) : ink
}

// 让位区朝外角方向拖到画布外（和一个伸向外角那个象限的大矩形做闵可夫斯基和）：角标朝主体的一侧是一圈细缝，
// 角标和外角之间的主体整片让掉——角标占满外角时（箭头、对勾），缝和外边之间不会剩下楔形的细条
// 每条边扫过的区域是「边 ⊕ 矩形」，一个凸六边形（边的两个端点各加上矩形的四个角，取凸包）；全部并起来再并上墨迹本身。
// 不用 Clipper 的 minkowskiSumD：它算的是轮廓 ⊕ 轮廓，几十个点的环要几十毫秒，结果中间还留着一个洞
// sweep 是这个矩形的四个角（相对墨迹的平移量），见 solid.js 的 SWEEP
function swept(ink, corners) {
  const parts = ink.flatMap(ring => ring.map((a, i) => {
    const b = ring[(i + 1) % ring.length]
    return hull([a, b].flatMap(p => corners.map(([dx, dy]) => ({ x: p.x + dx, y: p.y + dy }))))
  }))
  return boolean(ClipType.Union, [...ink, ...parts], null)
}

// 凸包（Andrew 单调链），点数很少
function hull(points) {
  const pts = [...points].sort((a, b) => a.x - b.x || a.y - b.y)
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
  const half = (list) => {
    const out = []
    for (const p of list) {
      while (out.length > 1 && cross(out.at(-2), out.at(-1), p) <= 0)
        out.pop()
      out.push(p)
    }
    return out.slice(0, -1)
  }
  return [...half(pts), ...half(pts.reverse())]
}

// ---------- 折线 → 直线 + 圆弧 ----------
// Clipper 输出的圆角是均匀的细折线。连续几段弦长相近、同向转弯、所有点都落在同一个圆上的，合成一段圆弧

const FIT_TOLERANCE = 0.006
const MAX_RADIUS = 40

function circumcircle(a, b, c) {
  const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y))
  if (Math.abs(d) < 1e-12)
    return null
  const [a2, b2, c2] = [a, b, c].map(p => p.x * p.x + p.y * p.y)
  const x = (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d
  const y = (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d
  return { x, y, r: Math.hypot(a.x - x, a.y - y) }
}
const chord = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

// pts[i..j]（含两端）能不能当作一段圆弧：所有点都在过首、中、尾三点的圆上，同向转弯，
// 每段弦都短（MAX_CHORD 以内、对应的圆心角不超过 MAX_STEP）。Clipper 偏移打散的曲线时每个顶点会出两个点，弦一长一短交替，
// 所以不比弦长是否相近；弦短这一条挡住多边形：正八边形的顶点也都在一个圆上，但每条边对应 45°
const MAX_CHORD = 0.6
const MAX_STEP = 0.45
function arcOf(pts, i, j) {
  if (j - i < 2)
    return null
  const c = circumcircle(pts[i], pts[(i + j) >> 1], pts[j])
  if (!c || c.r > MAX_RADIUS)
    return null
  // 转向看每段弦绕圆心转过的角度：短弦上的局部转向会被坐标精度（1e-4）的舍入噪声翻转，绕圆心的角度不会
  // 热循环（每个环要试很多次），都用平方比较：|d² − r²| ≈ 2r·|d − r|；转角 da 的正弦是两条半径的叉积 / r²
  const r2 = c.r * c.r
  const tol = FIT_TOLERANCE * 2 * c.r
  const maxSin = Math.sin(MAX_STEP)
  let sweep = 0
  for (let k = i; k < j; k++) {
    const [px, py, qx, qy] = [pts[k].x - c.x, pts[k].y - c.y, pts[k + 1].x - c.x, pts[k + 1].y - c.y]
    if ((qx - px) ** 2 + (qy - py) ** 2 > MAX_CHORD * MAX_CHORD || Math.abs(qx * qx + qy * qy - r2) > tol)
      return null
    const sin = (px * qy - py * qx) / r2
    // 往回走（点积为负）或者一步转得太多
    if (Math.abs(sin) > maxSin || px * qx + py * qy < 0)
      return null
    const da = Math.asin(sin)
    // 同向前进（极短的一步允许舍入误差带来的反向）
    if (sweep && Math.sign(da) !== Math.sign(sweep) && Math.abs(da) > 1e-3)
      return null
    sweep += da
  }
  // 超过 300° 的拆开：首尾太近时圆弧命令的数值不稳定
  if (Math.abs(sweep) < 1e-6 || Math.abs(sweep) > Math.PI * 5 / 3)
    return null
  return { ...c, sweep: Math.abs(sweep), cw: sweep > 0 }
}

const fmt = n => String(Math.round(n * 1e4) / 1e4)
const pt = p => `${fmt(p.x)} ${fmt(p.y)}`

// ---------- 折线 → 三次贝塞尔 ----------
// 不在圆上的光滑曲线（爱心、耳朵这类贝塞尔外形偏移出来的轮廓）也是成串的细折线，用 Schneider 的算法拟合成几段三次贝塞尔：
// 端点切线固定，弦长参数化 + 最小二乘求控制柄长度，误差超过 FIT_TOLERANCE 就在误差最大处切开、两段分别拟合

// 光滑段：弦都短（MAX_CHORD 以内），相邻两条弦的转角都小于 MAX_TURN；转角大的点是折角，不能被曲线磨圆
const MAX_TURN = 0.5
const MIN_SWEEP = 0.25
const sub2 = (a, b) => ({ x: a.x - b.x, y: a.y - b.y })
const unit = (v) => {
  const l = Math.hypot(v.x, v.y) || 1
  return { x: v.x / l, y: v.y / l }
}
const angleBetween = (u, v) => Math.abs(Math.atan2(u.x * v.y - u.y * v.x, u.x * v.x + u.y * v.y))
// 端点切线：Clipper 的输出里挨着很近的点受舍入影响大，取离端点至少 0.3 远的点定方向
function tangent(pts, from, step, to) {
  let k = from + step
  while (k !== to && chord(pts[k], pts[from]) < 0.3)
    k += step
  return unit(sub2(pts[k], pts[from]))
}
const bez = (p0, p1, p2, p3, t) => {
  const m = 1 - t
  const [a, b, c, d] = [m * m * m, 3 * m * m * t, 3 * m * t * t, t * t * t]
  return { x: a * p0.x + b * p1.x + c * p2.x + d * p3.x, y: a * p0.y + b * p1.y + c * p2.y + d * p3.y }
}
// pts[i..j] 拟合成一段贝塞尔：返回 [控制点 1, 控制点 2, 最大误差, 误差最大的点]
function fitOne(pts, i, j, t1, t2) {
  const [p0, p3] = [pts[i], pts[j]]
  const u = [0]
  for (let k = i + 1; k <= j; k++)
    u.push(u.at(-1) + chord(pts[k], pts[k - 1]))
  const total = u.at(-1)
  const ts = u.map(v => v / total)
  let [c00, c01, c11, x0, x1] = [0, 0, 0, 0, 0]
  ts.forEach((t, n) => {
    const m = 1 - t
    const [b1, b2] = [3 * m * m * t, 3 * m * t * t]
    const [a1, a2] = [{ x: t1.x * b1, y: t1.y * b1 }, { x: t2.x * b2, y: t2.y * b2 }]
    const base = bez(p0, p0, p3, p3, t)
    const r = sub2(pts[i + n], base)
    c00 += a1.x * a1.x + a1.y * a1.y
    c01 += a1.x * a2.x + a1.y * a2.y
    c11 += a2.x * a2.x + a2.y * a2.y
    x0 += a1.x * r.x + a1.y * r.y
    x1 += a2.x * r.x + a2.y * r.y
  })
  const det = c00 * c11 - c01 * c01
  let [l1, l2] = Math.abs(det) > 1e-12 ? [(x0 * c11 - x1 * c01) / det, (c00 * x1 - c01 * x0) / det] : [0, 0]
  // 控制柄算出来是负的或者太短（数值不稳）时退回弦长的三分之一
  if (l1 < total * 1e-3 || l2 < total * 1e-3)
    [l1, l2] = [total / 3, total / 3]
  const c1 = { x: p0.x + t1.x * l1, y: p0.y + t1.y * l1 }
  const c2 = { x: p3.x + t2.x * l2, y: p3.y + t2.y * l2 }
  let [err, at] = [0, (i + j) >> 1]
  // 控制柄朝弦的反方向伸出去、或者比弦还长（越过另一个端点）会打个小结：误差再小也不要
  const dot = (a, b) => a.x * b.x + a.y * b.y
  const span = chord(p0, p3)
  const reach = (c, from, to) => dot(sub2(c, from), sub2(to, from)) / (span || 1)
  if (Math.min(reach(c1, p0, p3), reach(c2, p3, p0)) < 0 || Math.max(chord(c1, p0), chord(c2, p3)) > span)
    err = Infinity
  ts.forEach((t, n) => {
    const e = chord(bez(p0, c1, c2, p3, t), pts[i + n])
    if (e > err)
      [err, at] = [e, i + n]
  })
  return [c1, c2, err, at]
}
function fitCubics(pts, i, j, t1, t2, out) {
  const [c1, c2, err, at] = fitOne(pts, i, j, t1, t2)
  if (err <= FIT_TOLERANCE || j - i < 4) {
    if (err <= FIT_TOLERANCE)
      out.push(`C${pt(c1)} ${pt(c2)} ${pt(pts[j])}`)
    else
      for (let k = i + 1; k <= j; k++) out.push(`L${pt(pts[k])}`)
    return
  }
  // 在误差最大的点切开，两段在切点共用一条切线（前后两点的连线方向），接起来仍然光滑
  const k = Math.min(j - 2, Math.max(i + 2, at))
  const mid = unit(sub2(pts[k + 1], pts[k - 1]))
  fitCubics(pts, i, k, t1, { x: -mid.x, y: -mid.y }, out)
  fitCubics(pts, k, j, mid, t2, out)
}
// 一段没有圆弧的折线 pts[i..j]：按折角切成光滑段，三段弦以上的光滑段拟合成贝塞尔，其余照旧是直线
function polyline(pts, i, j) {
  const out = []
  let s = i
  const smoothAt = k => chord(pts[k], pts[k + 1]) <= MAX_CHORD && chord(pts[k - 1], pts[k]) <= MAX_CHORD
    && angleBetween(sub2(pts[k], pts[k - 1]), sub2(pts[k + 1], pts[k])) <= MAX_TURN
  const length = (a, b) => {
    let l = 0
    for (let k = a; k < b; k++) l += chord(pts[k], pts[k + 1])
    return l
  }
  // 太短的光滑段（不到 0.5）直接用直线：几个点的切线方向不稳，拟合出来的控制柄可能朝后打个小结
  const flush = (e) => {
    if (e - s >= 3 && length(s, e) >= 0.5)
      fitCubics(pts, s, e, tangent(pts, s, 1, e), tangent(pts, e, -1, s), out)
    else
      for (let k = s + 1; k <= e; k++) out.push(`L${pt(pts[k])}`)
    s = e
  }
  for (let k = i + 1; k < j; k++) {
    if (!smoothAt(k))
      flush(k)
  }
  flush(j)
  return out.join('')
}

// 一个闭合环 → d。从最长的一条边起步：它几乎总是直线，不会把一段圆弧从中间切开
function ringToPath(raw) {
  // 几乎重合的点（Clipper 偏移时相距 1e-4 的一对）先去掉：这么短的弦方向全是舍入噪声，会被当成折角
  const ring = raw.filter((p, k) => k === 0 || chord(p, raw[k - 1]) > 0.002)
  if (ring.length > 1 && chord(ring[0], ring.at(-1)) <= 0.002)
    ring.pop()
  const n = ring.length
  let start = 0
  for (let i = 1; i < n; i++) {
    if (chord(ring[i], ring[(i + 1) % n]) > chord(ring[start], ring[(start + 1) % n]))
      start = i
  }
  const pts = [...ring.slice(start + 1), ...ring.slice(0, start + 1)]
  pts.push(pts[0])
  let d = `M${pt(pts[0])}`
  // 还没输出的折线从 run 开始；遇到圆弧或者走到头时，把它交给 polyline 拟合
  let run = 0
  let i = 0
  const last = pts.length - 1
  while (i < last) {
    // 下一段弦太长，这里起不了圆弧
    if (chord(pts[i], pts[i + 1]) > MAX_CHORD) {
      i++
      continue
    }
    // 圆弧能延伸到多远：跨度按倍数往外试，失败后在最后一次成功和第一次失败之间二分（逐点试是 O(n²)，大圆要几十毫秒）。
    // 刚起步时三个点挨得很近，过它们的圆受坐标舍入影响大，可能先失败、跨度大了反而成功，所以还没成功过时多试几档
    let ok = 0
    let bad = 0
    for (let span = 2, misses = 0; ; span *= 2) {
      const j = Math.min(i + span, last)
      if (arcOf(pts, i, j)) {
        ok = j
      }
      else {
        bad = j
        if (ok || ++misses > 3)
          break
      }
      if (j === last)
        break
    }
    if (ok && bad > ok) {
      while (bad - ok > 1) {
        const mid = (ok + bad) >> 1
        if (arcOf(pts, i, mid))
          ok = mid
        else
          bad = mid
      }
    }
    // 至少三段弦、转过 MIN_SWEEP 才认作圆弧：两段弦可能只是一个折角；几乎是直线的一小段（贝塞尔偏移出来的平缓部分）
    // 也能落在一个很大的圆上，但当成圆弧会切成几十段，交给 polyline 拟合贝塞尔
    const a = ok - i >= 3 && arcOf(pts, i, ok)
    if (a && a.sweep >= MIN_SWEEP) {
      d += polyline(pts, run, i)
      // 接近半圆的弧拆成两半：输出取两位小数后半径可能比半弦长还小一点，SVG 会把半径放大到正好半弦长、圆心挪到弦的中点，
      // 整段弧偏出去零点几格（铃舌的半圆往下掉了 0.14）
      const arc = (to, sweep) => `A${fmt(a.r)} ${fmt(a.r)} 0 ${sweep > Math.PI ? 1 : 0} ${a.cw ? 1 : 0} ${pt(to)}`
      if (Math.abs(a.sweep - Math.PI) < Math.PI / 4) {
        const mid = (i + ok) >> 1
        d += arc(pts[mid], a.sweep / 2) + arc(pts[ok], a.sweep / 2)
      }
      else {
        d += arc(pts[ok], a.sweep)
      }
      i = run = ok
    }
    else {
      i++
    }
  }
  return `${d}${polyline(pts, run, last)}Z`
}

const area = paths => paths.reduce((s, p) => s + Math.abs(Clipper.areaD(p)), 0)

// 墨迹的多边形（拟合成圆弧、贝塞尔之前）：Map<角色, PathsD>；挖空、合并剩下的碎屑（面积小于 0.01 的残片）不要
function inkRings(items, stroke, sharp) {
  const layers = new Map()
  // solid([...])、knock([...]) 返回数组，可以直接嵌在列表里
  for (const raw of items.flat(Infinity)) {
    const item = typeof raw === 'string' ? { d: raw } : raw
    // hidden 是描边版里只裁不画的遮挡框（盾牌系列的角标），实心版用不上
    if (!item.d || item.hidden)
      continue
    const ink = inkOf(item, stroke, sharp)
    if (item.knock) {
      for (const [tone, paths] of layers)
        layers.set(tone, boolean(ClipType.Difference, paths, ink))
      continue
    }
    const tone = item.tone && item.tone !== 'primary' ? item.tone : 'primary'
    layers.set(tone, boolean(ClipType.Union, layers.get(tone) ?? [], ink))
  }
  for (const [tone, paths] of layers)
    layers.set(tone, paths.filter(p => p.length > 2 && area([p]) > 0.01))
  return layers
}

// items：fill 绘制函数返回的路径数组；返回 [{ d, solid: true, tone? }]，每个角色一条
export function solidify(items, stroke, { sharp = false } = {}) {
  return [...inkRings(items, stroke, sharp)]
    .map(([tone, rings]) => {
      const d = minify(rings.map(ringToPath).join(''))
      return tone === 'primary' ? { d, solid: true } : { d, solid: true, tone }
    })
    .filter(p => p.d)
}

// 拟合误差（测试用）：输出的 d 重新打散成多边形，和拟合前的多边形做异或，异或面积除以轮廓总长，就是轮廓平均偏了多远（网格单位）
// 圆弧、贝塞尔拟合和两位小数的取整都算在里面：正常只有千分之几；拟合走样（半圆被放大、控制柄打结）时是百分之一以上
export function fitError(items, stroke, { sharp = false } = {}) {
  const out = new Map(solidify(items, stroke, { sharp }).map(p => [p.tone ?? 'primary', p.d]))
  let worst = 0
  for (const [tone, rings] of inkRings(items, stroke, sharp)) {
    const back = flatten(out.get(tone) ?? '').map(s => s.pts)
    // 异或的结果里外轮廓是正面积、洞是负面积（两边几乎一样的洞会变成一对正负相抵的环），按带符号的面积加起来
    const xor = Clipper.booleanOpD(ClipType.Xor, rings, back, FillRule.NonZero, PRECISION)
    const length = rings.reduce((l, r) => l + r.reduce((m, p, i) => m + chord(p, r[(i + 1) % r.length]), 0), 0)
    worst = Math.max(worst, Math.abs(xor.reduce((sum, p) => sum + Clipper.areaD(p), 0)) / (length || 1))
  }
  return worst
}
