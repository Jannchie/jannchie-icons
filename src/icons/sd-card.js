import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// SD 卡：左上切角的卡身 + 顶部三根金手指
export default ({ radius }) => [
  rounded([[8.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5], [5.5, 5.5]], Math.min(radius, 1.5)),
  'M10.5 2.5V6',
  'M13.5 2.5V6',
  'M16.5 2.5V6',
]

// 实心：卡身一块，挖掉三根金手指；金手指上端从卡边往里缩一个线宽，不把卡边咬开
export const fill = ({ radius, stroke }) => [
  solid(rounded([[8.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5], [5.5, 5.5]], Math.min(radius, 1.5))),
  knock([10.5, 13.5, 16.5].map(x => `M${x} ${2.5 + stroke}V6`)),
]
