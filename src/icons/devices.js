import { rounded } from '../geometry'

// 多设备：左后方显示器 + 右前方手机，两者之间留出间隙
export default ({ radius }) => [
  rounded([[2, 4], [14.5, 4], [14.5, 14.5], [2, 14.5]], Math.min(radius, 2)),
  'M8.25 14.5V18',
  'M5.5 18H11',
  rounded([[17, 8.5], [22, 8.5], [22, 20], [17, 20]], Math.min(radius, 1.5)),
]
