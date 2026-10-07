import { ring } from '../marks'
import { dot } from '../scene'

// 无障碍（通用）：圆环里一个张开双臂的人（人整体右移半格，躯干落在 12.5 上）
export default ({ radius }) => [
  ring(),
  dot(12.5, 7.5, 2.5),
  'M8 10.5L12.5 11.5L17 10.5',
  'M12.5 11.5V14',
  'M12.5 14L10 17.5',
  'M12.5 14L15 17.5',
]
