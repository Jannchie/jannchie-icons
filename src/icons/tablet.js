import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 平板：较宽的机身 + 底部一个圆点
export default ({ radius }) => [
  rounded([[4.5, 3.5], [19.5, 3.5], [19.5, 20.5], [4.5, 20.5]], Math.max(Math.min(radius, 3), 2)),
  dot(12, 18),
]

// 实心：机身一块，挖掉底部圆点
export const fill = ({ radius }) => [
  solid(rounded([[4.5, 3.5], [19.5, 3.5], [19.5, 20.5], [4.5, 20.5]], Math.max(Math.min(radius, 3), 2))),
  knock(dot(12, 18)),
]
