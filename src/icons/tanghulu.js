import { GAP } from '../clearance'
import { circle } from '../geometry'
import { solid } from '../solid'

// 糖葫芦：斜 45° 的一串，五颗山楂（半径 2.25，圆心相距 4.75，线挨着线）穿在竹签上；竹签从左下的山楂外伸出 2.5 当把手，右上露出 1.5 的签头
// 比三色团子多、小、挨得紧，一长串五颗是记号；整串沿对角线往右上挪 0.5，墨迹居中
const S = Math.SQRT1_2
const [R, SPACING] = [2.25, 4.75]
const f = v => +v.toFixed(3)
const at = t => [f(12 + t * S), f(12 - t * S)]
const centers = [-2, -1, 0, 1, 2].map(i => i * SPACING + 0.5)
const balls = centers.map(t => circle(...at(t), R))
const lo = centers[0] - R
const hi = centers.at(-1) + R
const stick = [`M${at(lo).join(' ')}L${at(lo - 2.5).join(' ')}`, `M${at(hi).join(' ')}L${at(hi + 1.5).join(' ')}`]

export default () => [...balls, ...stick]

// 实心：五颗山楂都是完整的实心圆（墨迹半径收到 (SPACING − GAP) / 2，颗与颗之间留出 GAP 的缝）；竹签照旧是线
export const fill = ({ stroke }) => [solid(centers.map(t => circle(...at(t), (SPACING - GAP) / 2 - stroke / 2))), ...stick]
