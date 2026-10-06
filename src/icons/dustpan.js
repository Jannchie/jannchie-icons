import { circle, rounded } from '../geometry'

// 簸箕（正面）：下宽上窄的铲面（最宽的前沿贴地）+ 从铲面背上竖起的长柄 + 柄顶的挂孔
export default ({ radius }) => [
  rounded([[6, 13], [18, 13], [21, 20.5], [3, 20.5]], Math.min(radius, 1.5)),
  'M12 13V5.5',
  circle(12, 4, 1.5),
]
