import { ring } from '../marks'
import { text } from '../controller'

// Xbox 左摇杆 LS：圆圈 + 键名
export default ({ radius }) => [
  ring(),
  ...text('LS', [12, 12]),
]
