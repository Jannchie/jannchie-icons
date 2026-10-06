import { ring } from '../marks'
import { text } from '../controller'

// Xbox 面键 B：圆圈 + 字母
export default ({ radius }) => [
  ring(),
  ...text('B', [12, 12], 1.35),
]
