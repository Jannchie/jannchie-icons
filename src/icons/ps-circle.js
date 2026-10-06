import { ring } from '../marks'
import { circle } from '../geometry'

// PS 面键 ○：圆圈 + 小圆
export default ({ radius }) => [
  ring(),
  circle(12, 12, 4),
]
