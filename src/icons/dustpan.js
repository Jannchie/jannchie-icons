import { circle, rounded } from '../geometry'

// 簸箕（正面）：下宽上窄的铲面（最宽的前沿贴地）+ 从铲面背上竖起的长柄 + 柄顶的挂孔
export default ({ radius }) => [
  // 中轴右移半格到 12.5（长柄落在 .5 上），铲面上沿在 13.5
  rounded([[6.5, 13.5], [18.5, 13.5], [21, 20.5], [4, 20.5]], Math.min(radius, 1.5)),
  'M12.5 13.5V5.5',
  circle(12.5, 4, 1.5),
]
