import { ring } from '../marks'
import { dot } from '../scene'

// 信息：圆 + i（右移半格落在 12.5 上）
export default ({ radius }) => [
  ring(),
  dot(12.5, 8),
  'M12.5 11V16.5',
]
