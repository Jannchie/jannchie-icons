import { circle } from '../geometry'
import { ring, square } from '../marks'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 单选框（已选）：圆 + 中间实心点
export default ({ radius, stroke }) => [
  ring(),
  dot(12, 12, 7),
]

// 实心：圆一块，挖掉一圈细环，环里的实心圆和描边版中间的点一样大
export const fill = ({ stroke }) => [solid(ring()), knock(circle(12, 12, 3.5 * stroke / 1.5 + stroke / 2))]
