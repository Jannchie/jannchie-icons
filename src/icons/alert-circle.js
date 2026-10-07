import { ring } from '../marks'
import { dot } from '../scene'

// 错误提示：圆 + 感叹号（感叹号右移半格落在 12.5 上）
export default ({ radius }) => [
  ring(),
  'M12.5 7.5V12.5',
  dot(12.5, 16),
]
