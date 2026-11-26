import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'
import { knock, solid } from '../solid'
import { pediment } from './bank'

// 博物馆：和 bank 同一个三角山花（两端各一小段竖直的檐口），山花下是一整面平墙（5.5–18.5），墙上挂一幅画：
// 画框 8.5–15.5 × 11.5–17.5，框里一座山（峰顶 (11, 14)，两坡 45°，左脚接在画框左边、右脚落在画框底边上）。
// 墙上的画是记号：bank 是一排柱子，这里换成画，看得出是收藏、展览的地方
const walls = [`M5.5 9.5V${GROUND}`, `M18.5 9.5V${GROUND}`]
const painting = radius => [
  rounded([[8.5, 11.5], [15.5, 11.5], [15.5, 17.5], [8.5, 17.5]], Math.min(radius, 0.5)),
  rounded([[8.5, 16.5], [11, 14], [14.5, 17.5]], Math.min(radius, 0.5), false),
]

export default ({ radius }) => [groundLine, pediment(radius), ...walls, ...painting(radius)]

// 实心：山花一块，墙一块（底下两个角贴着地平线，不收圆角），山花底边整条挖穿、和墙分开（同 store 的遮阳棚）；
// 画框和山脊线从墙上挖出来（画面留实心）；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(pediment(radius)),
  solid(`M5.5 9.5H18.5V${GROUND}H5.5Z`),
  knock([`M${3.5 - stroke} 9.5H${20.5 + stroke}`, ...painting(radius)]),
  groundLine,
]
