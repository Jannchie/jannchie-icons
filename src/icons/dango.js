import { GAP } from '../clearance'
import { circle } from '../geometry'
import { solid } from '../solid'

// 团子（三色团子）：斜 45° 的一串，三颗圆团子（半径 3，圆心相距 SPACING，线挨着线）穿在竹签上；竹签从左下的团子外伸出一截当把手，右上露出一小截签尖
// 竹签只画露在团子外面的两段（径向，和团子垂直相接）
const S = Math.SQRT1_2
const [R, SPACING] = [3, 7.25]
const f = v => +v.toFixed(3)
// 沿对角线的位置 t（0 在画布中心，往右上为正）；整串往右上挪 0.5，墨迹居中
const at = t => [f(12.5 + t * S), f(11.5 - t * S)]
const centers = [-SPACING, 0, SPACING]
const balls = centers.map(t => circle(...at(t), R))
const stick = [
  `M${at(-SPACING - R).join(' ')}L${at(-SPACING - R - 2.75).join(' ')}`,
  `M${at(SPACING + R).join(' ')}L${at(SPACING + R + 1.5).join(' ')}`,
]

export default () => [...balls, ...stick]

// 实心：三颗团子都是完整的实心圆（墨迹半径收到 (SPACING − GAP) / 2，颗与颗之间正好留出 GAP 的缝，不互相啃出月牙）；竹签照旧是线
export const fill = ({ stroke }) => [
  solid(centers.map(t => circle(...at(t), (SPACING - GAP) / 2 - stroke / 2))),
  ...stick,
]
