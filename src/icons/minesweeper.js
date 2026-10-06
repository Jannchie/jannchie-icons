import { circle } from '../geometry'
import { dot } from '../scene'

// 扫雷：圆形地雷 + 四周八根刺 + 左上一点高光
export default ({ radius }) => [
  circle(12, 12, 5.5),
  'M12 3V5.5',
  'M12 18.5V21',
  'M3 12H5.5',
  'M18.5 12H21',
  'M5.6 5.6L7.4 7.4',
  'M16.6 16.6L18.4 18.4',
  'M18.4 5.6L16.6 7.4',
  'M7.4 16.6L5.6 18.4',
  dot(10, 10, 2),
]
