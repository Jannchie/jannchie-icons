import { rounded } from '../geometry'

// 钢琴键（白键宽 4、黑键宽 2；外框 16 × 15，居中）：圆角外框 + 三道白键分隔 + 两个黑键（中间那道分隔上没有黑键，像 E、F 之间）
export default ({ radius }) => [
  rounded([[4, 4.5], [20, 4.5], [20, 19.5], [4, 19.5]], Math.min(radius, 2)),
  'M8 13.5V19.5',
  'M12 4.5V19.5',
  'M16 13.5V19.5',
  rounded([[7, 4.5], [7, 13.5], [9, 13.5], [9, 4.5]], Math.min(radius, 0.75), false),
  rounded([[15, 4.5], [15, 13.5], [17, 13.5], [17, 4.5]], Math.min(radius, 0.75), false),
]
