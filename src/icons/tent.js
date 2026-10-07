import { crisp, rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

// 帐篷：两片帐面在顶上交叉伸出（撑杆头），正中三角门帘；帐顶的尖不随全局圆角
const apex = [12, 5]
const slope = (GROUND - apex[1]) / 8.5 // 帐面从顶点往两侧各展开 8.5

export default ({ radius }) => [
  groundLine,
  `M${apex[0] - 8.5} ${GROUND}L${apex[0] + 1.5} ${apex[1] - 1.5 * slope}`,
  `M${apex[0] + 8.5} ${GROUND}L${apex[0] - 1.5} ${apex[1] - 1.5 * slope}`,
  rounded([[8.5, GROUND], [12, 12.5, crisp(radius)], [15.5, GROUND]], radius, false),
]
