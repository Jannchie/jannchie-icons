import { crisp, rounded } from '../geometry'
import { hole, knock, solid } from '../solid'
import { star } from '../symbols'

// 巫师帽：尖顶的帽身 + 帽带 + 帽身上一颗小星 + 帽檐（上沿平直、下沿成弧，和 hat 一样）
const cone = radius => rounded([[6.5, 17.5], [11.5, 3], [17.5, 17.5]], crisp(radius), false)
// 帽带两端落在帽身两条斜边上
const bandY = 14.5
const [bandL, bandR] = [+(6.5 + (17.5 - bandY) * 5 / 14.5).toFixed(3), +(17.5 - (17.5 - bandY) * 6 / 14.5).toFixed(3)]
const band = `M${bandL} ${bandY}H${bandR}`
const brim = 'M3 17.5H21C21 19.25 17 20.5 12 20.5C7 20.5 3 19.25 3 17.5Z'
const badge = radius => star([12, 10.25], 0.75, radius)

export default ({ radius }) => [cone(radius), band, brim, ...badge(radius)]

// 实心：帽身和帽檐连成一块，挖掉帽带（两端穿出斜边一个线宽，切口顺着斜边），星星挖空
export const fill = ({ radius, stroke }) => [solid([cone(radius), brim]), knock(`M${bandL - stroke} ${bandY}H${bandR + stroke}`), hole(badge(radius))]
