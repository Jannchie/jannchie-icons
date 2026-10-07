import { rounded } from '../geometry'

// 多设备：左后方显示器 + 右前方手机，两者之间留出间隙
export default ({ radius }) => [
  rounded([[2.5, 4.5], [14.5, 4.5], [14.5, 14.5], [2.5, 14.5]], Math.min(radius, 2)),
  'M8.5 14.5V18.5',
  'M5.5 18.5H11.5',
  rounded([[17.5, 8.5], [21.5, 8.5], [21.5, 20.5], [17.5, 20.5]], Math.min(radius, 1.5)),
]
