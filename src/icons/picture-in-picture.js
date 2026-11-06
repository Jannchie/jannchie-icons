import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 画中画：大框 + 右下角小框
export default ({ radius }) => [
  rounded([[2.5, 4.5], [21.5, 4.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2.5)),
  rounded([[12.5, 11.5], [18.5, 11.5], [18.5, 16.5], [12.5, 16.5]], Math.min(radius, 1)),
]

// 实心：大框填实，挖掉小框的边，小框里面留成实心
export const fill = ({ radius }) => [
  solid(rounded([[2.5, 4.5], [21.5, 4.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2.5))),
  knock(rounded([[12.5, 11.5], [18.5, 11.5], [18.5, 16.5], [12.5, 16.5]], Math.min(radius, 1))),
]
