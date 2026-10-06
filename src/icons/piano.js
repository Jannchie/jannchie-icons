import { rounded } from '../geometry'

// 钢琴键：圆角外框 + 三道白键分隔 + 两个黑键（中间那道分隔上没有黑键，像 E、F 之间）
export default ({ radius }) => [
  rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2)),
  'M7.5 13.5V20',
  'M12 4V20',
  'M16.5 13.5V20',
  rounded([[6.25, 4], [6.25, 13.5], [8.75, 13.5], [8.75, 4]], Math.min(radius, 0.75), false),
  rounded([[15.25, 4], [15.25, 13.5], [17.75, 13.5], [17.75, 4]], Math.min(radius, 0.75), false),
]
