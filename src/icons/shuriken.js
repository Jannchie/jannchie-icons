import { circle, crisp, rounded } from '../geometry'
import { hole, solid } from '../solid'

// 手里剑（四方手里剑）：直边的四角星（四个刃尖朝上下左右，到中心 9.5；刃根在斜 45° 方向、到中心 4.5）+ 正中的圆孔（半径 1.75）
// 直边 + 圆孔，和四边内凹、没有孔的 sparkle 区分开
const [R, r] = [9.5, 4.5]
const f = v => +v.toFixed(3)
const points = Array.from({ length: 8 }, (_, i) => {
  const a = (i * 45 - 90) * Math.PI / 180
  const k = i % 2 ? r : R
  return [f(12 + k * Math.cos(a)), f(12 + k * Math.sin(a))]
})
const star = radius => rounded(points, crisp(radius))
const eyelet = circle(12, 12, 1.75)

export default ({ radius }) => [star(radius), eyelet]

// 实心：四角星一块，正中的圆孔挖成洞
export const fill = ({ radius, stroke }) => [solid(star(radius)), hole(circle(12, 12, 1.75 - stroke / 2))]
