// SVG 路径数据的语法层：解析成绝对坐标的分段、压缩写法、找横竖线段
// 不依赖任何别的模块：clip.js、transform.js、svg.js（finalize）、render.js（像素对齐）、export.js 都建在它上面
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
      // 路径中间的零长度直线（残段）丢掉；紧跟在 M 后面的要留着，那是圆点（M x y h0）
      if (a[0] === cx && a[1] === cy && !/m/i.test(last))
        continue
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
      // 起止点重合的圆弧（裁切、圆角后的残段）按 SVG 规范整段不画，直接丢掉
      if (a[5] === cx && a[6] === cy)
        continue
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

// 统一的绝对坐标写法（每段命令字母 + 紧排的数字）：动画帧要求同一图标各帧的命令序列一致，SMIL 才能逐个数字插值
export const absolute = d => parse(d).map(([t, a]) => t + join(a)).join('')
