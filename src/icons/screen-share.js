import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { screen, stand } from '../monitor'
import { knock, solid } from '../solid'

// 屏幕共享：显示器 + 屏幕里向上的箭头
export default ({ radius }) => [
  rounded(screen, Math.min(radius, 2.5)),
  ...stand,
  'M11.5 13V7.5',
  rounded(arrow(11.5, 7.5, 'up', 2.5), crisp(radius), false),
]

// 实心：屏幕一块，挖掉向上的箭头
export const fill = ({ radius }) => [
  solid(rounded(screen, Math.min(radius, 2.5))),
  knock(['M11.5 13V7.5', rounded(arrow(11.5, 7.5, 'up', 2.5), crisp(radius), false)]),
  ...stand,
]
