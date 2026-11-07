import { rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'
import { hole, knock, solid } from '../solid'

// 公寓楼：宽矮的平顶楼，檐口出挑，三层窗点每层四扇，门居中（门上方那层只留两侧的窗）
const columns = [7, 10, 14, 17]
const eave = 'M3.5 5.5H20.5'
const windows = [...[8.5, 11.5].flatMap(y => columns.map(x => dot(x, y))), dot(7, 14.5), dot(17, 14.5)]

export default ({ radius }) => [
  groundLine,
  eave,
  `M4.5 5.5V${GROUND}`,
  `M19.5 5.5V${GROUND}`,
  ...windows,
  rounded(opening(12, 3, 4.5), radius, false),
]

// 实心：两面墙和檐口围成的楼身一块（直角，和描边版一样），檐口照旧是线；窗点挖成圆点（尖角模式下也是圆的；粗字重下不再放大，免得点和点之间只剩细条），门挖空（洞外扩半个线宽后是门框的中心线）；
// 地平线最后画，门洞不切断它
export const fill = ({ radius, stroke }) => [
  solid(`M4.5 5.5H19.5V${GROUND}H4.5Z`),
  eave,
  knock(windows.map(w => ({ ...w, round: true, eye: true }))),
  hole(rounded(opening(12, 3 - stroke, 4.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
