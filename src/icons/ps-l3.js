import { ring } from '../marks'
import { text } from '../controller'

// PS 左摇杆按下 L3：圆圈 + 键名
export default ({ radius }) => [
  ring(),
  ...text('L3', [12, 12]),
]
