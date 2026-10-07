import { rounded } from '../geometry'
import { dot } from '../scene'

// 节拍器：梯形机身 + 底座横线 + 斜摆的摆杆 + 摆杆上的砝码
// 底座横线落在 16.5，端点正好落在两条斜边上（不靠端点吸附去找边，免得横线被拉斜）
const inset = 3.5 * 13 / 17
export default ({ radius }) => [
  rounded([[8.5, 3.5], [15.5, 3.5], [19, 20.5], [5, 20.5]], Math.min(radius, 1.5)),
  `M${8.5 - inset} 16.5H${15.5 + inset}`,
  'M12 16.5L16 6',
  dot(14.4, 10.4, 3),
]
