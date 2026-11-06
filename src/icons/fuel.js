import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'
import { hole, solid } from '../solid'

// 加油站（油泵）：泵身 4.5–14.5 × 3.5–20.5 立在地平线上，上部一块显示窗（6.5–12.5 × 5.5–9.5，闭合）；
// 油枪的管子从泵身右侧垂直伸出，往下绕到右边的挂钩（19.5），再竖直往上
export default ({ radius }) => [
  groundLine,
  rounded([[4.5, GROUND], [4.5, 3.5], [14.5, 3.5], [14.5, GROUND]], Math.min(radius, 1.5), false),
  rounded([[6.5, 5.5], [12.5, 5.5], [12.5, 9.5], [6.5, 9.5]], Math.min(radius, 1)),
  rounded([[14.5, 11.5], [16.5, 11.5], [16.5, 16.5], [19.5, 16.5], [19.5, 7.5], [17.5, 5.5]], Math.min(radius, 1.5), false),
]

// 实心：泵身一块，显示窗挖空（洞外扩半个线宽后和描边版窗框的中心线一样大，泵身两侧留得出边）；油管和地平线照旧是线
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid(rounded([[4.5, GROUND], [4.5, 3.5], [14.5, 3.5], [14.5, GROUND]], Math.min(radius, 1.5))),
    hole(rounded([[6.5 + h, 5.5 + h], [12.5 - h, 5.5 + h], [12.5 - h, 9.5 - h], [6.5 + h, 9.5 - h]], Math.max(0, Math.min(radius, 1) - h))),
    rounded([[14.5, 11.5], [16.5, 11.5], [16.5, 16.5], [19.5, 16.5], [19.5, 7.5], [17.5, 5.5]], Math.min(radius, 1.5), false),
    groundLine,
  ]
}
