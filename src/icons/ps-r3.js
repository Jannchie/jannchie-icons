import { ring } from '../marks'
import { text } from '../controller'

// PS 右摇杆按下 R3：圆圈 + 键名
export default ({ radius }) => [
  ring(),
  ...text('R3', [12, 12]),
]
