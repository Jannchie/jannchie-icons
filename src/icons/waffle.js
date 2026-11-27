import { knock, solid } from '../solid'

// 华夫饼：右上咬掉一口的圆饼（和 cookie 同一条轮廓：圆心 (12, 12)、半径 9）+ 饼面上横竖各三道格线（7.5 / 12 / 16.5，两头落在圆上；右上那两道停在咬口的尖上——咬口的尖 (16.5, 7.5) 正好是一个格点）
// 一格一格的方格是华夫饼的记号；咬掉的一口说明它是吃的：和撒巧克力豆的 cookie、方框的 grid-3x3、经纬线是弧的 globe 区分开
const cake = 'M20.69 9.67A9 9 0 1 1 14.33 3.31C14 5.5 15 7.5 16.5 7.5C16.5 9 18.5 10 20.69 9.67Z'
// 圆上 x = v（或 y = v）这条弦的半长
const half = v => +Math.sqrt(81 - (v - 12) ** 2).toFixed(3)
// extend：实心版把格线两头往外多挖的一段（挖出圆外、挖进咬口里）
const grid = (extend = 0) => [
  `M7.5 ${12 - half(7.5) - extend}V${12 + half(7.5) + extend}`,
  `M12 ${3 - extend}V${21 + extend}`,
  `M16.5 ${7.5 - extend}V${12 + half(16.5) + extend}`,
  `M${12 - half(7.5) - extend} 7.5H${16.5 + extend}`,
  `M${3 - extend} 12H${21 + extend}`,
  `M${12 - half(16.5) - extend} 16.5H${12 + half(16.5) + extend}`,
]

export default () => [cake, ...grid()]

// 实心：圆饼一块，格线两头都挖穿，饼面分成一格一格的
export const fill = ({ stroke }) => [solid(cake), knock(grid(stroke))]
