import { circle, rounded } from '../geometry'

// 摇杆：底座 + 杆 + 顶上的球 + 底座上一个按键
export default ({ radius }) => [
  // 整体右移半格，杆落在 12.5 上
  rounded([[4.5, 16.5], [20.5, 16.5], [20.5, 20.5], [4.5, 20.5]], Math.min(radius, 1.5)),
  'M12.5 16.5V9',
  circle(12.5, 6, 3),
  rounded([[16.5, 16.5], [16.5, 14.5], [18.5, 14.5], [18.5, 16.5]], Math.min(radius, 0.75), false),
]
