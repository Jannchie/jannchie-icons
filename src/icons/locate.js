import { circle } from '../geometry'
import { dot } from '../scene'

// 定位（GPS）：圆（圆心 (12, 12)、半径 6.5）+ 上下左右四根刻度从圆周向外伸 3.5 + 圆心实心点
// 刻度沿径向接在圆周上
export default () => [
  circle(12, 12, 6.5),
  'M12 2V5.5M12 18.5V22M2 12H5.5M18.5 12H22',
  dot(12, 12, 3),
]
