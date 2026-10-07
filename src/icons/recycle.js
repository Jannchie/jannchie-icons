import { crisp, rounded } from '../geometry'

// 循环（回收）：三段互相追赶的圆弧箭头，间隔 120°
// 半径取 5.5·√2：135° 处那支箭头的一翼水平、一翼竖直，端点要落在 (6.5, 17.5)
const [cx, cy, r] = [12, 12, 5.5 * Math.SQRT2]
const rad = deg => deg * Math.PI / 180
const at = deg => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))]
const s = 2.5
function arcArrow(from, to, radius) {
  const end = at(to)
  // 箭头朝向取「箭头长度那一段圆弧」的弦方向，而不是终点切线：圆弧在箭头范围里是弯的，按切线放两翼会一边贴弧、一边张开，看着歪
  const back = at(to - s / r * 180 / Math.PI)
  const len = Math.hypot(end[0] - back[0], end[1] - back[1])
  const t = [(end[0] - back[0]) / len, (end[1] - back[1]) / len]
  const n = [-t[1], t[0]]
  const wing = k => [end[0] - (t[0] - k * n[0]) * s, end[1] - (t[1] - k * n[1]) * s]
  return [`M${at(from).join(' ')}A${r} ${r} 0 0 1 ${end.join(' ')}`, rounded([wing(1), end, wing(-1)], crisp(radius), false)]
}

export default ({ radius }) => [0, 120, 240].flatMap(a => arcArrow(a - 75, a + 15, radius))
