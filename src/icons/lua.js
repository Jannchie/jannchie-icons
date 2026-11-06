import { circle } from '../geometry'
import { hole, solid } from '../solid'

// Lua：大圆（行星）+ 右上角里面的小洞 + 右上角外面的小圆（卫星）
// 行星圆心 (10.5, 13.5)、半径 7，左下贴到 3.5 / 20.5；洞在圆心右上 45° 方向，离行星边留约 2.4
// 卫星圆心 (18.5, 5.5)，和行星圆心同在 45° 线上，两圆之间空出约 2.3
export default () => [
  circle(10.5, 13.5, 7),
  circle(12.5, 11.5, 1.75),
  circle(18.5, 5.5, 2),
]

// 实心：行星和卫星填实，行星上的小洞挖空（洞外扩半个线宽后正好是描边版小圆的中心线）
export const fill = ({ stroke }) => [
  solid(circle(10.5, 13.5, 7)),
  hole(circle(12.5, 11.5, 1.75 - stroke / 2)),
  solid(circle(18.5, 5.5, 2)),
]
