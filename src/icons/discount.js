import { circle } from '../geometry'
import { ring } from '../marks'

// 折扣：圆环 + 中间的百分号
export default ({ radius }) => [
  ring(),
  'M15 9L9 15',
  circle(9.25, 9.25, 1.25),
  circle(14.75, 14.75, 1.25),
]
