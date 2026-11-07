import { crisp, rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'
import { cutout, solid } from '../solid'

// 帐篷：两片帐面在顶上交叉伸出（撑杆头），正中三角门帘；帐顶的尖不随全局圆角
const apex = [12, 5]
const slope = (GROUND - apex[1]) / 8.5 // 帐面从顶点往两侧各展开 8.5
const poles = [
  `M${apex[0] - 8.5} ${GROUND}L${apex[0] + 1.5} ${apex[1] - 1.5 * slope}`,
  `M${apex[0] + 8.5} ${GROUND}L${apex[0] - 1.5} ${apex[1] - 1.5 * slope}`,
]
const door = radius => [[8.5, GROUND], [12, 12.5, crisp(radius)], [15.5, GROUND]]

export default ({ radius }) => [
  groundLine,
  ...poles,
  rounded(door(radius), radius, false),
]

// 实心：两片帐面围成的三角填实，撑杆头照旧是线；门帘按描边版门框的中心线挖空（两边顺着斜边往下穿出地面），帐底两个锐角在尖角模式下斜接出的尖从地平线下缘切平；地平线最后画、不被门切断
export const fill = ({ radius, stroke }) => [
  solid(`M${apex[0] - 8.5} ${GROUND}L${apex[0]} ${apex[1]}L${apex[0] + 8.5} ${GROUND}Z`),
  ...poles,
  cutout(rounded([[8.5 - 3.5 / 4, GROUND + 2, 0], door(radius)[1], [15.5 + 3.5 / 4, GROUND + 2, 0]], radius)),
  cutout(`M0 ${GROUND + stroke / 2}H24V24H0Z`),
  groundLine,
]
