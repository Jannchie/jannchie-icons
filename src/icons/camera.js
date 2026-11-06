import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 相机：机身顶部一个 45° 斜边的取景器凸起 + 镜头圆
export default ({ radius }) => [
  rounded([[2.5, 7.5], [8, 7.5], [10, 5.5], [14, 5.5], [16, 7.5], [21.5, 7.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2.5)),
  circle(12, 13.25, 3.5),
]

// 实心：机身一块，挖掉镜头圆圈，镜片留成实心圆
export const fill = ({ radius }) => [
  solid(rounded([[2.5, 7.5], [8, 7.5], [10, 5.5], [14, 5.5], [16, 7.5], [21.5, 7.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2.5))),
  knock(circle(12, 13.25, 3.5)),
]
