import { rounded } from '../geometry'
import { dot } from '../scene'

// 掌机：竖长机身 + 上方屏幕 + 左下十字键 + 右下两个按键
export default ({ radius }) => [
  rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2.5)),
  rounded([[8.5, 5.5], [15.5, 5.5], [15.5, 11.5], [8.5, 11.5]], Math.min(radius, 1)),
  'M8.5 16.5H12.5',
  'M10.5 14.5V18.5',
  dot(14.5, 17.5),
  dot(16, 15.5),
]
