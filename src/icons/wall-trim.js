import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 墙面边饰（立面）：一面墙（3.5–20.5 × 3.5–20.5，顶边是天花、底边是地面）；
// 下面一条踢脚线（16.5，高 4）、上面一条顶角线（6.5，离天花 3），两条线的两端都接在墙的左右两边上
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1)),
  'M3.5 16.5H20.5',
  'M3.5 6.5H20.5',
]

// 实心：墙面一块，踢脚线和顶角线挖开，分出三段墙面
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1))),
  knock(['M3.5 16.5H20.5', 'M3.5 6.5H20.5']),
]
