import { fillParts, plain, WAIST, waist } from '../briefcase'
import { knock } from '../solid'

// 公文包：箱体 + 提手 + 腰线
export default ({ radius, stroke }) => [...plain(radius, stroke), waist(stroke)]

// 实心：箱体一块，腰线整条挖穿，箱体分成箱盖、箱身上下两片（和日历的表头线一样）；提手照旧是线
export const fill = ({ radius, stroke }) => {
  const { body, lines } = fillParts(radius, stroke)
  return [...body, knock(`M0 ${WAIST}H24`), ...lines]
}
