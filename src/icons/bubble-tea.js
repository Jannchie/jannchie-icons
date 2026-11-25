import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 珍珠奶茶：上宽下窄的杯身（6.5–17.5 收到 8–16，7.5–20.5）+ 封口的杯盖（横线 5–19）+ 一根斜插的直吸管 + 杯里的液面线（11.5）
// + 杯底三颗珍珠。和 soda（弯吸管、空杯身）区分开
const TOP = 7.5
const cup = radius => rounded([[6.5, TOP], [8, 20.5], [16, 20.5], [17.5, TOP]], Math.min(radius, 1.5), false)
const lid = `M5 ${TOP}H19`
const straw = `M12.5 ${TOP}L14.5 2.75`
// 液面线两端落在杯壁上（杯壁每往下 13 往里收 1.5）
const inset = (11.5 - TOP) * 1.5 / 13
const level = `M${+(6.5 + inset).toFixed(3)} 11.5H${+(17.5 - inset).toFixed(3)}`
const pearls = [dot(10.25, 17.5), dot(13.75, 17.5), dot(12, 14.75)].map(p => ({ ...p, round: true }))

export default ({ radius }) => [cup(radius), lid, straw, level, ...pearls]

// 实心：杯身一块，和杯盖之间挖开一道穿出两侧的缝（同 soda）；液面线整条挖穿，珍珠挖空；杯盖、吸管照旧是线
export const fill = ({ radius, stroke }) => [
  solid(`${cup(radius)}Z`),
  knock([`M3 ${TOP + stroke}H21`, 'M5 11.5H19', ...pearls]),
  lid,
  straw,
]
