import { circle, rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 音响：竖长的箱体 + 上方小高音单元 + 下方大低音单元（中心一点）
export default ({ radius }) => [
  rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2.5)),
  circle(12, 7, 1.75),
  circle(12, 14.75, 4),
  dot(12, 14.75),
]

// 实心：箱体一块，挖掉两个单元的圆圈（单元留成实心）和低音单元中心的点
export const fill = ({ radius }) => [
  solid(rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2.5))),
  knock([circle(12, 7, 1.75), circle(12, 14.75, 4), dot(12, 14.75)]),
]
