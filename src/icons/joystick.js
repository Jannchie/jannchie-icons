import { circle, rounded } from '../geometry'

// 摇杆：底座 + 杆 + 顶上的球 + 底座上一个按键
export default ({ radius }) => [
  // 底座 4–20 左右居中，杆和球落在中轴 12 上
  rounded([[4, 16.5], [20, 16.5], [20, 20.5], [4, 20.5]], Math.min(radius, 1.5)),
  'M12 16.5V9',
  circle(12, 6, 3),
  rounded([[16, 16.5], [16, 14.5], [18, 14.5], [18, 16.5]], Math.min(radius, 0.75), false),
]
