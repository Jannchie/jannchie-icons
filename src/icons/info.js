import { ring } from '../marks'
import { dot } from '../scene'

// 信息：圆 + i（竖笔落在中轴 12 上）
export default ({ radius }) => [
  ring(),
  dot(12, 8),
  'M12 11V16.5',
]
