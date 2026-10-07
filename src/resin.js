// 树脂识别码 ♳–♹：三个首尾追逐的折线箭头围成三角形，中间是编号
import { crisp, rounded } from './geometry'
import { line } from './letters'

// 三角形顶点（顺时针：顶、右下、左下）
const V = [[12, 3], [21.5, 19.5], [2.5, 19.5]]
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const S = 2.25 // 箭头翼长

// 第 k 支箭头：从上一条边的后段出发，绕过顶点 k，停在下一条边的前段，箭头指向前进方向
function arrow(k, radius) {
  const [prev, at, next] = [V[(k + 2) % 3], V[k], V[(k + 1) % 3]]
  const from = lerp(prev, at, 0.58)
  const to = lerp(at, next, 0.36)
  const len = Math.hypot(next[0] - at[0], next[1] - at[1])
  const t = [(next[0] - at[0]) / len, (next[1] - at[1]) / len]
  const n = [-t[1], t[0]]
  const wing = s => [to[0] - (t[0] + s * n[0]) * S, to[1] - (t[1] + s * n[1]) * S]
  return [rounded([from, at, to], Math.min(radius, 2), false), rounded([wing(1), to, wing(-1)], crisp(radius), false)]
}

export const RESIN = Object.fromEntries([
  ['1', 'PET'],
  ['2', 'HDPE'],
  ['3', 'PVC'],
  ['4', 'LDPE'],
  ['5', 'PP'],
  ['6', 'PS'],
  ['7', 'OTHER'],
].map(([n, abbr]) => [n, {
  zh: `${n} ${abbr}`,
  paths: radius => [...[0, 1, 2].flatMap(k => arrow(k, radius)), ...line(n, [12, 14]).map(d => ({ d, detail: true }))],
}]))
