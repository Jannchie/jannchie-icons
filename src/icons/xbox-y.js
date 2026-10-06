import { ring } from '../marks'
import { text } from '../controller'

// Xbox 面键 Y：圆圈 + 字母
export default ({ radius }) => [
  ring(),
  ...text('Y', [12, 12], 1.35),
]
