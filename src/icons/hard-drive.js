import { circle, rounded } from '../geometry'
import { dot } from '../scene'

// 机械硬盘：竖放的盒子 + 盘片（圆 + 轴心）+ 右下斜伸进来的磁头臂
export default ({ radius }) => [
  rounded([[4, 2.5], [20, 2.5], [20, 21.5], [4, 21.5]], Math.min(radius, 2)),
  circle(12, 10, 5),
  dot(12, 10),
  'M17 18.5L13.5 13.5',
  dot(17, 18.5, 2.5),
]
