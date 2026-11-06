import { circle, rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 机械硬盘：竖放的盒子 + 盘片（圆 + 轴心）+ 右下斜伸进来的磁头臂
export default ({ radius }) => [
  rounded([[4.5, 2.5], [19.5, 2.5], [19.5, 21.5], [4.5, 21.5]], Math.min(radius, 2)),
  circle(12, 10, 5),
  dot(12, 10),
  'M17 18.5L13.5 13.5',
  dot(17, 18.5, 2.5),
]

// 实心：盒子一块，挖掉盘片的圆圈（盘片留成实心）、轴心、磁头臂和它的支点
export const fill = ({ radius }) => [
  solid(rounded([[4.5, 2.5], [19.5, 2.5], [19.5, 21.5], [4.5, 21.5]], Math.min(radius, 2))),
  knock([circle(12, 10, 5), dot(12, 10), 'M17 18.5L13.5 13.5', dot(17, 18.5, 2.5)]),
]
