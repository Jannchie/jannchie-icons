import { circle, crisp, rounded } from '../geometry'

// 光盘：外圆 + 中孔 + 一段高光弧
export default ({ radius, stroke }) => [
  circle(12, 12, 9),
  circle(12, 12, 2.5),
  'M12 5.5A6.5 6.5 0 0 1 18.5 12',
]
