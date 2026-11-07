import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 饮料杯：上宽下窄的杯身 + 杯盖 + 斜插的吸管
const LID = 8.5
const cup = radius => rounded([[6, LID], [7.5, 20.5], [16.5, 20.5], [18, LID]], Math.min(radius, 1.5), false)
const lid = `M5 ${LID}H19`
const straw = radius => rounded([[12, LID], [14, 2.5], [17, 2.5]], Math.min(radius, 0.75), false)

export default ({ radius }) => [
  cup(radius),
  lid,
  straw(radius),
]

// 实心：杯身填实，和杯盖之间挖开一道穿出两侧的缝（同 trash）；杯盖、吸管照旧是线
export const fill = ({ radius, stroke }) => [
  solid(`${cup(radius)}Z`),
  knock(`M4 ${LID + stroke}H20`),
  lid,
  straw(radius),
]
