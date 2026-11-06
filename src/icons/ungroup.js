import { circle, crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 取消编组：两个方块分开摆放
export default ({ radius, stroke }) => [
  rounded([[3.5, 3.5], [10.5, 3.5], [10.5, 10.5], [3.5, 10.5]], Math.min(radius, 1.5)),
  rounded([[13.5, 13.5], [20.5, 13.5], [20.5, 20.5], [13.5, 20.5]], Math.min(radius, 1.5)),
]

// 实心：两个方块都填实
export const fill = ({ radius }) => [
  solid([
    rounded([[3.5, 3.5], [10.5, 3.5], [10.5, 10.5], [3.5, 10.5]], Math.min(radius, 1.5)),
    rounded([[13.5, 13.5], [20.5, 13.5], [20.5, 20.5], [13.5, 20.5]], Math.min(radius, 1.5)),
  ]),
]
