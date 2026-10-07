// 图标输出前的统一收尾：几何断线、压缩路径数据，并把样式相同的路径合并成一条
import { GAP } from './clearance'
import { clip, samples, segments } from './clip'
import { DOT } from './scene'
// 坐标保留两位小数：24 网格上误差 0.005，放大到 128px 也只有 0.03px

const round = n => Math.round(n * 100) / 100
const num = n => String(round(n)).replace(/^(-?)0\./, '$1.')

// 把数字 n 接到 s 后面，只在必要时加空格：负号本身就能分隔；前一个数已经有小数点时，「.5」的点也能分隔（1.42.59 = 1.42 0.59）
const glue = (s, n) => s + (/[\d.]$/.test(s) && !n.startsWith('-') && !(n.startsWith('.') && /\.\d*$/.test(s)) ? ' ' : '') + n
const join = nums => nums.map(num).reduce(glue, '')

const ARITY = { M: 2, L: 2, H: 1, V: 1, C: 6, Q: 4, A: 7, Z: 0 }

// 解析并转成绝对坐标的分段：[命令, 参数（绝对）]；precise 时不取整（裁剪用）
export function parse(d, precise = false) {
  const tokens = d.match(/[a-z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/gi) ?? []
  const segs = []
  let [cx, cy, sx, sy] = [0, 0, 0, 0]
  let i = 0
  let cmd = ''
  while (i < tokens.length) {
    if (/[a-z]/i.test(tokens[i]))
      cmd = tokens[i++]
    const C = cmd.toUpperCase()
    const rel = cmd !== C
    const args = tokens.slice(i, i + ARITY[C]).map(Number)
    i += ARITY[C]
    const ox = rel ? cx : 0
    const oy = rel ? cy : 0
    let abs
    switch (C) {
      case 'M': case 'L': abs = [args[0] + ox, args[1] + oy]; break
      case 'H': abs = [args[0] + ox, cy]; break
      case 'V': abs = [cx, args[0] + oy]; break
      case 'C': abs = args.map((v, j) => v + (j % 2 ? oy : ox)); break
      case 'Q': abs = args.map((v, j) => v + (j % 2 ? oy : ox)); break
      case 'A': abs = [...args.slice(0, 5), args[5] + ox, args[6] + oy]; break
      default: abs = []
    }
    if (!precise)
      abs = abs.map(round)
    const type = C === 'H' || C === 'V' ? 'L' : C
    segs.push([type, abs])
    if (C === 'Z')
      [cx, cy] = [sx, sy]
    else
      [cx, cy] = abs.slice(-2)
    if (C === 'M') {
      [sx, sy] = [cx, cy]
      if (cmd === 'M' || cmd === 'm')
        cmd = rel ? 'l' : 'L' // M 后面的隐式重复是 L
    }
  }
  return segs
}

// 路径里的横竖线段：[轴向（'x' 表示竖线，取它的 x 坐标；'y' 表示横线）, 坐标, 长度]
// 像素对齐（render.js）、字形吸附（letters.js）、网格审计（scripts/audit-grid.mjs）共用
export function axisLines(d) {
  const lines = []
  let pos = [0, 0]
  let start = [0, 0]
  for (const [t, a] of parse(d, true)) {
    const to = t === 'Z' ? start : a.slice(-2)
    if (t === 'M') {
      start = to
    }
    else if (t === 'L' || t === 'Z') {
      const [dx, dy] = [Math.abs(to[0] - pos[0]), Math.abs(to[1] - pos[1])]
      if (dx < 1e-6 && dy > 1e-6)
        lines.push(['x', to[0], dy])
      else if (dy < 1e-6 && dx > 1e-6)
        lines.push(['y', to[1], dx])
    }
    pos = to
  }
  return lines
}

// 每段在绝对/相对写法里挑短的，水平竖直线用 H/V，连续相同命令省掉字母
// packArcs：圆弧的两个标志位紧排（0 0 1 2 2 → 0 012 2，SVG 语法允许）。只在导出时用——parse 会把 012 读成一个数
export function minify(d, { packArcs = false } = {}) {
  let out = ''
  let last = ''
  let [cx, cy, sx, sy] = [0, 0, 0, 0]
  for (const [type, a] of parse(d)) {
    const candidates = []
    if (type === 'M') {
      candidates.push(['M', a], ['m', [a[0] - cx, a[1] - cy]])
    }
    else if (type === 'L') {
      if (a[1] === cy)
        candidates.push(['H', [a[0]]], ['h', [a[0] - cx]])
      else if (a[0] === cx)
        candidates.push(['V', [a[1]]], ['v', [a[1] - cy]])
      else
        candidates.push(['L', a], ['l', [a[0] - cx, a[1] - cy]])
    }
    else if (type === 'C' || type === 'Q') {
      candidates.push([type, a], [type.toLowerCase(), a.map((v, j) => v - (j % 2 ? cy : cx))])
    }
    else if (type === 'A') {
      candidates.push(['A', a], ['a', [...a.slice(0, 5), a[5] - cx, a[6] - cy]])
    }
    else {
      candidates.push(['z', []])
    }
    const write = (c, n) => (packArcs && /a/i.test(c) ? `${glue(join(n.slice(0, 3)), `${n[3]}${n[4]}`)}${join(n.slice(5))}` : join(n))
    const [cmd, body] = candidates
      .map(([c, n]) => [c, write(c, n)])
      .reduce((best, c) => (c[1].length < best[1].length ? c : best))
    // 同一命令连续出现可以省掉字母（M 除外，它的隐式重复是 L），但要能和上一个数字分开
    const repeat = cmd === last && !/m/i.test(cmd) && cmd !== 'z'
    out = repeat ? glue(out, body) : out + cmd + body
    last = cmd
    if (type === 'Z')
      [cx, cy] = [sx, sy]
    else
      [cx, cy] = a.slice(-2)
    if (type === 'M')
      [sx, sy] = [cx, cy]
  }
  return out
}

// 各类线条的实际线宽：detail（缩小的符号）封顶 DETAIL_STROKE，thin（内部细线）是外框的 THIN 倍
export const DETAIL_STROKE = 1.5
export const THIN = 0.7
// relief 是拥挤检测（见 relieve）给出的退让线宽，只会让线变细
const widthOf = (item, stroke) => Math.min(item.thin ? stroke * THIN : item.detail ? Math.min(stroke, DETAIL_STROKE) : stroke, item.relief ?? Infinity)
// 点：显式给了 dot 直径，或者是字符串写的零长度路径（M x y h0，按默认直径 DOT）
const dotSize = item => item.dot ?? (/^(?:M[^MLHVCSQTAZ]+h0)+$/i.test(item.d.replace(/\s+/g, '')) ? DOT : 0)
// 点的直径是按线宽 DOT_STROKE 设计的，实际按字重等比缩放：点和线的粗细比例在任何字重下都一样
// （默认 DOT 2 : 线宽 1.5，略大于线宽，补偿圆点看起来比同宽的线小）
export const DOT_STROKE = 1.5
const dotWidth = (item, stroke) => dotSize(item) * stroke / DOT_STROKE

// 端点吸附：开放线条的端点如果碰到了另一条线（两者中心线距离小于半线宽之和），说明它本来就是要接到那条线上的，
// 把端点精确投影到那条线上最近的点。这样端点落在被圆角切掉的角部、或者稍微画过头时，线头都不会从另一条线外侧冒出来。
// 距离几乎为 0 的（已经接好）不动；首尾重合的闭合环不动（只挪一头会撕开）；点不参与
function nearestOn(p, pts) {
  let best = { d2: Infinity, q: null }
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = [pts[i - 1], pts[i]]
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
    const len2 = dx * dx + dy * dy
    const t = len2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2)) : 0
    const [qx, qy] = [a[0] + dx * t, a[1] + dy * t]
    const d2 = (p[0] - qx) ** 2 + (p[1] - qy) ** 2
    if (d2 < best.d2)
      best = { d2, q: [qx, qy] }
  }
  return best
}
const inBox = ([x, y], b, g) => x >= b[0] - g && x <= b[2] + g && y >= b[1] - g && y <= b[3] + g
function snapEnds(items, stroke) {
  // 每个子路径采样成折线（直线只取端点，曲线取 48 段），并记下包围盒，用来先排除离得远的线
  const shapes = items.map((it) => {
    if (dotSize(it))
      return null
    const subs = segments(it.d).map((sub) => {
      const pts = sub.segs.flatMap(s => samples(s, 48))
      const b = pts.reduce((b, [x, y]) => [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)], [Infinity, Infinity, -Infinity, -Infinity])
      return { pts, b }
    })
    return { w: widthOf(it, stroke), subs }
  })
  return items.map((it, i) => {
    if (!shapes[i])
      return it
    const cmds = parse(it.d, true)
    const starts = cmds.flatMap(([t], k) => (t === 'M' ? [k] : []))
    let moved = false
    starts.forEach((m, k) => {
      const last = (starts[k + 1] ?? cmds.length) - 1
      if (last <= m || cmds[last][0] === 'Z')
        return
      const end = cmds[last][1].slice(-2)
      const start = cmds[m][1]
      if (Math.hypot(end[0] - start[0], end[1] - start[1]) < 0.01)
        return
      const snap = (p) => {
        let best = { d2: Infinity, q: null, w: 0 }
        shapes.forEach((sh, j) => sh?.subs.forEach(({ pts, b }, n) => {
          if ((j === i && n === k) || !inBox(p, b, (shapes[i].w + sh.w) / 2))
            return
          const r = nearestOn(p, pts)
          if (r.d2 < best.d2)
            best = { d2: r.d2, q: r.q, w: sh.w }
        }))
        const d = Math.sqrt(best.d2)
        if (!(d > 0.01 && d < (shapes[i].w + best.w) / 2 - 0.02))
          return null
        // 目标点就在这条线自己身上：两条线已经在那里接上了（T 的横杠、I 的衬线），这个端点只是出头，不是没接到。
        // 吸过去会把短横整段缩没
        return nearestOn(best.q, shapes[i].subs[k].pts).d2 < 0.0025 ? null : best.q
      }
      const q0 = snap(start)
      if (q0) {
        const [dx, dy] = [q0[0] - start[0], q0[1] - start[1]]
        cmds[m][1] = q0
        const next = cmds[m + 1]
        if (next[0] === 'C' || next[0] === 'Q')
          next[1] = next[1].map((v, n) => (n < 2 ? v + (n ? dy : dx) : v))
        moved = true
      }
      const q1 = snap(end)
      if (q1) {
        const [dx, dy] = [q1[0] - end[0], q1[1] - end[1]]
        const [t, a] = cmds[last]
        const ctrl = t === 'C' ? [2, 3] : t === 'Q' ? [0, 1] : []
        cmds[last][1] = a.map((v, n) => (n >= a.length - 2 ? (n === a.length - 2 ? q1[0] : q1[1]) : ctrl.includes(n) ? v + (n % 2 ? dy : dx) : v))
        moved = true
      }
    })
    return moved ? { ...it, d: cmds.map(([t, a]) => t + a.join(' ')).join('') } : it
  })
}

// 箭头尖：一条开放线的端点落在另一条折线的尖角上、并且是从角的内部伸进去的（箭杆顶到箭头尖、纸飞机的折线）——
// 线头会从尖上冒出来：圆头模式下是个小鼓包，尖角模式下方头的两个角戳出斜接的尖。
// 把端点沿线往回缩到两翼内侧边线的交点（离尖 (w/2)/sin(半角)），线头就藏进尖角的线条里。曲线箭杆按曲线本身裁短。
// 尖角可以是直接的折角，也可以是 rounded() 切出的小圆角（两条直线之间夹一段短弧，顶点取两条直线的交点）
const TIP_MAX_TURN = Math.PI * 5 / 6
function cornersOf(d) {
  const out = []
  for (const sub of segments(d)) {
    const segs = sub.segs.filter(s => samples(s, 1).length > 1)
    const dir = (s, t) => {
      const [a, b] = t ? [s.at(Math.max(0, t - 0.01)), s.at(t)] : [s.at(0), s.at(0.01)]
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
      return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]
    }
    // 闭合子路径首尾相接：rounded() 的起点就在第一个顶点的圆角之后，那个角跨在末尾和开头之间，按环来取
    const n = segs.length
    const seg = j => (sub.closed ? segs[j % n] : segs[j])
    for (let i = 0; i < (sub.closed ? n : n - 1); i++) {
      let [a, c, k] = [seg(i), seg(i + 1), i + 1]
      if (!c)
        continue
      // 线 + 短弧 + 线：圆角
      if (c.kind === 'curve' && seg(i + 2)?.kind === 'line') {
        const [p, q] = [c.at(0), c.at(1)]
        if (Math.hypot(q[0] - p[0], q[1] - p[1]) < 1.5)
          [c, k] = [seg(i + 2), i + 2]
      }
      if (a.kind !== 'line' || c.kind !== 'line')
        continue
      const [u, v] = [dir(a, 1), dir(c, 0)]
      const turn = Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1])))
      if (turn < Math.PI / 3 || turn > TIP_MAX_TURN + 0.2)
        continue
      // 顶点：两条直线的交点
      const [p, q] = [a.at(1), c.at(0)]
      const den = u[0] * v[1] - u[1] * v[0]
      const s = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / den
      const vtx = [p[0] + u[0] * s, p[1] + u[1] * s]
      const b = [v[0] - u[0], v[1] - u[1]]
      const bl = Math.hypot(b[0], b[1])
      out.push({ vtx, bisector: [b[0] / bl, b[1] / bl], half: (Math.PI - turn) / 2 })
      i = k - 1
    }
  }
  return out
}
function tuckTips(items, stroke) {
  // 每个尖角记下所属路径（owner），被藏进去的线头会把它记进自己的 joins，拥挤检测据此跳过这一对
  const corners = items.flatMap((it, owner) => (dotSize(it) || it.fill ? [] : cornersOf(it.d).map(c => ({ ...c, owner, w: widthOf(it, stroke) }))))
  if (!corners.length)
    return items
  return items.map((it, i) => {
    if (dotSize(it) || it.fill)
      return it
    let changed = false
    const joins = new Set()
    const subs = segments(it.d).map((sub) => {
      const segs = [...sub.segs]
      let start = sub.start
      if (sub.closed || !segs.length)
        return { start, segs: segs.map(s => s.sub(0, 1)), closed: sub.closed }
      const out = segs.map(s => s.sub(0, 1))
      for (const end of [0, 1]) {
        const seg = end ? segs.at(-1) : segs[0]
        const p = seg.at(end)
        const corner = corners
          .find((c) => {
            if (Math.hypot(c.vtx[0] - p[0], c.vtx[1] - p[1]) > 0.75)
              return false
            // 线要从角的内部伸进来：从端点往回走的方向和角平分线（指向角内）夹角小于半角
            const q = seg.at(end ? 0.9 : 0.1)
            const back = [q[0] - p[0], q[1] - p[1]]
            const bl = Math.hypot(back[0], back[1]) || 1
            return (back[0] * c.bisector[0] + back[1] * c.bisector[1]) / bl > Math.cos(c.half)
          })
        if (!corner)
          continue
        const L = corner.w / 2 / Math.sin(corner.half)
        // 在这一段上找离顶点 L 的位置（从端点往回二分）
        const dist = t => Math.hypot(seg.at(t)[0] - corner.vtx[0], seg.at(t)[1] - corner.vtx[1])
        if (dist(end ? 0 : 1) <= L)
          continue
        let [lo, hi] = [0, 1]
        for (let n = 0; n < 30; n++) {
          const m = (lo + hi) / 2
          if (end ? dist(m) > L : dist(m) < L) lo = m
          else hi = m
        }
        const t = end ? lo : hi
        if (end) {
          out[out.length - 1] = seg.sub(0, t)
        }
        else {
          start = seg.at(t)
          out[0] = seg.sub(t, 1)
        }
        changed = true
        joins.add(corner.owner)
      }
      return { start, segs: out, closed: false }
    })
    if (!changed)
      return it
    const fmt = n => Math.round(n * 1000) / 1000
    const d = subs.map(s => `M${fmt(s.start[0])} ${fmt(s.start[1])}${s.segs.join('')}${s.closed ? 'Z' : ''}`).join('')
    return { ...it, d, joins: [...(it.joins ?? []), ...joins] }
  })
}

// 拥挤检测：只在最粗的字重（线宽 ≥ CROWD_STROKE）下做。两条互不相连的线，中心线距离小于「两者半线宽之和 + MIN_GAP」时，
// 加粗后中间的空隙几乎看不见，会糊成一团——把较短的那条（通常是内部细节）退细到刚好留出 MIN_GAP 的线宽
// （按 0.25 取整，最多退一档到 RELIEF_MIN，退太多和周围的粗线对比太强）；两条长度相近（短的不到长的 80% 才算「较短」）时两条一起退，免得卦爻这类等长的线粗细不一。
// 相交、端点接上的线（距离≈0），以及线头被藏进对方尖角的一对（tuckTips 记下的 joins），是有意连在一起的，不算拥挤。按子路径判断，退让只作用在挤到的那一段子路径上
const CROWD_STROKE = 2
const MIN_GAP = 0.75
const RELIEF_MIN = 1.5
function segDist2(p, a, b) {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
  const len2 = dx * dx + dy * dy
  const t = len2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2)) : 0
  return (p[0] - a[0] - dx * t) ** 2 + (p[1] - a[1] - dy * t) ** 2
}
const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
const intersects = (a, b, c, d) => cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0
// 两条折线之间的最近距离
function polyDist(p, q) {
  let best = Infinity
  for (let i = 0; i < p.length; i++) {
    for (let j = 0; j < q.length; j++) {
      best = Math.min(best, segDist2(p[i], q[j], q[j + 1] ?? q[j]), segDist2(q[j], p[i], p[i + 1] ?? p[i]))
      if (p[i + 1] && q[j + 1] && intersects(p[i], p[i + 1], q[j], q[j + 1]))
        return 0
      // 已经相接（relieve 不再关心更近多少），提前结束
      if (best < 0.0025)
        return Math.sqrt(best)
    }
  }
  return Math.sqrt(best)
}
function relieve(items, stroke) {
  if (stroke < CROWD_STROKE)
    return items
  // 拆成子路径：每段一个折线采样、包围盒和长度
  // 点和实心形状整体保留、不退让（fixed），只当障碍物：实心形状拆开会把挖空的孔（全音符的符头）单独填实
  const parts = items.flatMap((it, owner) => {
    const dot = dotSize(it)
    if (dot || it.fill)
      return [{ it, owner, d: it.d, fixed: true, w: dot ? dotWidth(it, stroke) : widthOf(it, stroke), pts: segments(it.d).flatMap(s => s.segs.flatMap(g => samples(g, dot ? 1 : 16))) }]
    const cmds = parse(it.d, true)
    const starts = cmds.flatMap(([t], k) => (t === 'M' ? [k] : []))
    const subs = segments(it.d)
    return starts.map((m, k) => {
      const pts = subs[k].segs.flatMap(g => samples(g, 16))
      const len = pts.reduce((n, p, i) => n + (i ? Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0)
      const d = cmds.slice(m, starts[k + 1] ?? cmds.length).map(([t, a]) => t + a.join(' ')).join('')
      return { it, owner, d, w: widthOf(it, stroke), pts, len }
    })
  })
  const boxes = parts.map(p => p.pts.reduce((b, [x, y]) => [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)], [Infinity, Infinity, -Infinity, -Infinity]))
  // 每段子路径允许的最大线宽
  const caps = new Map()
  const limit = (i, w) => caps.set(i, Math.min(caps.get(i) ?? Infinity, Math.max(RELIEF_MIN, Math.floor(w * 4) / 4)))
  for (let i = 0; i < parts.length; i++) {
    for (let j = i + 1; j < parts.length; j++) {
      const [a, b] = [parts[i], parts[j]]
      if (a.fixed && b.fixed)
        continue
      const reach = (a.w + b.w) / 2 + MIN_GAP
      const [p, q] = [boxes[i], boxes[j]]
      if (p[0] - reach > q[2] || q[0] - reach > p[2] || p[1] - reach > q[3] || q[1] - reach > p[3])
        continue
      if (a.it.joins?.includes(b.owner) || b.it.joins?.includes(a.owner))
        continue
      const d = polyDist(a.pts, b.pts)
      if (d < 0.05 || d >= reach)
        continue
      // 点和实心形状不退；和它们挤在一起时只退线
      const [short, long] = a.fixed ? [j, i] : b.fixed ? [i, j] : a.len <= b.len ? [i, j] : [j, i]
      if (!parts[long].fixed && parts[short].len >= parts[long].len * 0.8) {
        limit(short, d - MIN_GAP)
        limit(long, d - MIN_GAP)
      }
      else {
        limit(short, 2 * (d - MIN_GAP) - parts[long].w)
      }
    }
  }
  if (![...caps.values()].some(w => w < stroke))
    return items
  return parts.map((p, i) => (caps.get(i) < p.w ? { ...p.it, d: p.d, relief: caps.get(i) } : { ...p.it, d: p.d }))
}

// 着色：双色变体里每条路径有一个角色（tone）。primary 是主体；角标、划掉的斜杠这类表示状态的叠加记号
// 由图标显式标注语义角色（src/tone.js：danger、success、warning、info、accent），不标就是 primary
const toneOf = item => item.tone ?? 'primary'

// 路径：字符串或 { d, detail, fill, thin, dot, cut, gap, occlude, hidden, tone }
// - cut 是「刀」：其余路径在离它 gap（默认 GAP）+ 线宽以内的部分被真正裁掉；
//   occlude 的刀还会把落在它闭合区域内部的线整段删掉（前后叠放、镜片内部之类）；hidden 的刀只裁不画
// - detail 是缩小的符号（线宽封顶 DETAIL_STROKE），thin 是内部细线（线宽取外框的 THIN 倍），dot 是点在线宽 DOT_STROKE 下的直径（随字重等比缩放）
// 裁切后做端点吸附（见 snapEnds）和拥挤检测（见 relieve），再按（细节、实心、点、细线）分组合并、压缩；每组带上实际线宽 width（和外框相同时为 undefined）
// 动画帧（animated）：不做拥挤检测（逐帧判断会让各帧的路径结构不一致），也不压缩——
// 输出统一的绝对坐标写法，同一图标各帧的命令序列一致，SMIL 才能逐个数字插值
const absolute = d => parse(d).map(([t, a]) => t + join(a)).join('')
export function finalize(paths, stroke, { animated = false } = {}) {
  const items = paths.map(p => (typeof p === 'string' ? { d: p } : p))
  // 刀按间隙分组，每组各裁一次
  const cuts = new Map()
  for (const p of items.filter(p => p.cut)) {
    const g = p.gap ?? GAP
    const group = cuts.get(g) ?? { ds: [], occluders: [] }
    group.ds.push(p.d)
    if (p.occlude)
      group.occluders.push(p.d)
    cuts.set(g, group)
  }
  const cutAll = d => [...cuts].reduce((acc, [g, { ds, occluders }]) => (acc ? clip(acc, ds, g + stroke, occluders) : acc), d)
  const clipped = items
    .map(p => (cuts.size && !p.cut ? { ...p, d: cutAll(p.d) } : p))
    .filter(p => p.d && !p.hidden)
  const groups = new Map()
  const snapped = tuckTips(snapEnds(clipped, stroke), stroke)
  for (const item of animated ? snapped : relieve(snapped, stroke)) {
    const dot = dotSize(item)
    const tone = toneOf(item)
    const key = [Boolean(item.detail), Boolean(item.fill), dot, Boolean(item.thin), item.relief ?? 0, tone].join()
    const g = groups.get(key)
    if (g) {
      g.d += item.d
    }
    else {
      const w = widthOf(item, stroke)
      groups.set(key, { d: item.d, detail: !!item.detail, fill: !!item.fill, dot, thin: !!item.thin, tone, width: dot ? dotWidth(item, stroke) : w !== stroke ? w : undefined })
    }
  }
  return [...groups.values()].map(g => ({ ...g, d: animated ? absolute(g.d) : minify(g.d) }))
}
