import { ring } from '../marks'
import { rounded } from '../geometry'

// Xbox View 键：圆圈 + 两个错开叠放的小方框（后面那个只画露出的部分）
export default ({ radius }) => [
  ring(),
  rounded([[8.5, 10.5], [13.5, 10.5], [13.5, 15.5], [8.5, 15.5]], Math.min(radius, 0.75)),
  rounded([[10.5, 10.5], [10.5, 8.5], [15.5, 8.5], [15.5, 13.5], [13.5, 13.5]], Math.min(radius, 0.75), false),
]
