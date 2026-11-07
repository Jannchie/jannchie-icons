import { circle, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, solid } from '../solid'

// 车站：拱形大棚，拱里一只钟；拱脚一道挑檐，两墙落地，正中大门
export default ({ radius }) => [
  groundLine,
  'M5 11.5A7 7 0 0 1 19 11.5',
  'M3.5 11.5H20.5',
  `M4.5 11.5V${GROUND}`,
  `M19.5 11.5V${GROUND}`,
  circle(12, 8, 1.75),
  { d: 'M12 6.75V8H13.25', detail: true },
  rounded(opening(12, 5, 5.5), radius, false),
]

// 实心：拱顶、墙身各一块；钟面整个挖成圆洞（外缘到描边版钟圈的外缘），指针画回洞里——只挖钟圈和指针的话，
// 钟面只剩几块碎渣，看着像月牙；大门挖空；挑檐和地平线照旧是线
export const fill = ({ radius, stroke }) => [
  solid('M5 11.5A7 7 0 0 1 19 11.5Z'),
  solid(`M4.5 11.5H19.5V${GROUND}H4.5Z`),
  hole(circle(12, 8, 1.75)),
  { d: 'M12 6.75V8H13.25', detail: true },
  'M3.5 11.5H20.5',
  hole(rounded(opening(12, 5 - stroke, 5.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
