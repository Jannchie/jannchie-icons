import { ring } from '../marks'
import { dot } from '../scene'

// 错误提示：圆 + 感叹号
export default ({ radius }) => [
  ring(),
  'M12 7.5V12.5',
  dot(12, 16),
]
