// 图标输出前的统一收尾：几何断线、压缩路径数据，并把样式相同的路径合并成一条
import { GAP } from './clearance'
import { clip, samples, segments } from './clip'
import { DOT } from './scene'
// 坐标保留两位小数：24 网格上误差 0.005，放大到 128px 也只有 0.03px

const round = n => Math.round(n * 100) / 100
const num = n => String(round(n)).replace(/^(-?)0\./, '$1.')

// 数字之间只在必要时加空格：负号本身就能分隔
function join(nums) {
  return nums.map(num).reduce((s, n, i) => s + (i && !n.startsWith('-') ? ' ' : '') + n, '')
}

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

// 每段在绝对/相对写法里挑短的，水平竖直线用 H/V，连续相同命令省掉字母
export function minify(d) {
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
    const [cmd, body] = candidates
      .map(([c, n]) => [c, join(n)])
      .reduce((best, c) => (c[1].length < best[1].length ? c : best))
    // 同一命令连续出现可以省掉字母（M 除外，它的隐式重复是 L），但要能和上一个数字分开
    const repeat = cmd === last && !/m/i.test(cmd) && cmd !== 'z'
    out += repeat ? (body.startsWith('-') ? '' : ' ') + body : cmd + body
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
const widthOf = (item, stroke) => (item.thin ? stroke * THIN : item.detail ? Math.min(stroke, DETAIL_STROKE) : stroke)
// 点：显式给了 dot 直径，或者是字符串写的零长度路径（M x y h0，按默认直径 DOT）
const dotSize = item => item.dot ?? (/^(?:M[^MLHVCSQTAZ]+h0)+$/i.test(item.d.replace(/\s+/g, '')) ? DOT : 0)

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

// 路径：字符串或 { d, detail, fill, thin, dot, cut, gap, occlude, hidden }
// - cut 是「刀」：其余路径在离它 gap（默认 GAP）+ 线宽以内的部分被真正裁掉；
//   occlude 的刀还会把落在它闭合区域内部的线整段删掉（前后叠放、镜片内部之类）；hidden 的刀只裁不画
// - detail 是缩小的符号（线宽封顶 DETAIL_STROKE），thin 是内部细线（线宽取外框的 THIN 倍），dot 是点的直径（不跟随字重）
// 裁切后做端点吸附（见 snapEnds），再按（细节、实心、点、细线）分组合并、压缩；每组带上实际线宽 width（和外框相同时为 undefined）
export function finalize(paths, stroke) {
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
  for (const item of snapEnds(clipped, stroke)) {
    const dot = dotSize(item)
    const key = [Boolean(item.detail), Boolean(item.fill), dot, Boolean(item.thin)].join()
    const g = groups.get(key)
    if (g) {
      g.d += item.d
    }
    else {
      const w = widthOf(item, stroke)
      groups.set(key, { d: item.d, detail: !!item.detail, fill: !!item.fill, dot, thin: !!item.thin, width: dot || (w !== stroke ? w : undefined) })
    }
  }
  return [...groups.values()].map(g => ({ ...g, d: minify(g.d) }))
}
