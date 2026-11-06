import { circle, crisp, rounded } from '../geometry'
import { hole, knock, solid } from '../solid'

// 光盘：外圆 + 中孔 + 一段高光弧
export default ({ radius, stroke }) => [
  circle(12, 12, 9),
  circle(12, 12, 2.5),
  'M12 5.5A6.5 6.5 0 0 1 18.5 12',
]

// 实心：光盘一块，中孔挖空（洞外扩半个线宽后正好是描边版中孔的中心线），挖掉高光弧
export const fill = ({ stroke }) => [
  solid(circle(12, 12, 9)),
  hole(circle(12, 12, 2.5 - stroke / 2)),
  knock('M12 5.5A6.5 6.5 0 0 1 18.5 12'),
]
