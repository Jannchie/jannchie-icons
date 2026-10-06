import { ring } from '../marks'
import { text } from '../controller'

// Xbox 右摇杆 RS：圆圈 + 键名
export default ({ radius }) => [
  ring(),
  ...text('RS', [12, 12]),
]
