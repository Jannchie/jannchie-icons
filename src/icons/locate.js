import { circle } from '../geometry'
import { dot } from '../scene'

// 定位（GPS）：圆（圆心 (12.5, 12.5)、半径 6.5）+ 上下左右四根刻度从圆周向外伸 3.5 + 圆心实心点
// 刻度沿径向接在圆周上；竖线、横线都落在 12.5 上
export default () => [
  circle(12.5, 12.5, 6.5),
  'M12.5 2.5V6M12.5 19V22.5M2.5 12.5H6M19 12.5H22.5',
  dot(12.5, 12.5, 3),
]
