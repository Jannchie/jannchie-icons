import { crisp, rounded } from '../geometry'

// 循环（回收）：三段互相追赶的圆弧箭头，间隔 120°
const [cx, cy, r] = [12, 12, 8]
const rad = deg => deg * Math.PI / 180
const at = deg => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))]
const s = 2.5
function arcArrow(from, to, radius) {
  const end = at(to)
  const t = [-Math.sin(rad(to)), Math.cos(rad(to))]
  const n = [-t[1], t[0]]
  const wing = k => [end[0] - (t[0] - k * n[0]) * s, end[1] - (t[1] - k * n[1]) * s]
  return [`M${at(from).join(' ')}A${r} ${r} 0 0 1 ${end.join(' ')}`, rounded([wing(1), end, wing(-1)], crisp(radius), false)]
}

export default ({ radius }) => [0, 120, 240].flatMap(a => arcArrow(a - 75, a + 15, radius))
