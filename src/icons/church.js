import { GAP } from '../clearance'
import { circle, crisp, rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'
import { clear, hole, knock, solid } from '../solid'

// 教堂：正中尖塔顶十字，两侧斜顶侧殿靠在塔上；塔里一扇圆窗、一扇拱门
const cx = 12
const half = 3 // 塔身半宽

export default ({ radius }) => [
  groundLine,
  rounded([[cx - half, GROUND], [cx - half, 9.5], [cx, 5.5, crisp(radius)], [cx + half, 9.5], [cx + half, GROUND]], radius, false),
  `M${cx} 2.5V5.5`,
  `M${cx - 1} 3.5H${cx + 1}`,
  `M4 ${GROUND}V14.5L${cx - half} 11.5`,
  `M20 ${GROUND}V14.5L${cx + half} 11.5`,
  circle(cx, 12.5, 1.25),
  `M${cx - 1} ${GROUND}V17.5A1 1 0 0 1 ${cx + 1} 17.5V${GROUND}`,
]

// 实心：塔身一块，两侧的侧殿各一块、和塔身之间让出缝；圆窗挖空（窗芯留实心），拱门挖空；十字和地平线照旧是线
export const fill = ({ radius, stroke }) => {
  const tower = rounded([[cx - half, GROUND], [cx - half, 9.5], [cx, 5.5, crisp(radius)], [cx + half, 9.5], [cx + half, GROUND]], radius)
  return [
    solid([`M4 ${GROUND}V14.5L${cx - half} 11.5V${GROUND}Z`, `M20 ${GROUND}V14.5L${cx + half} 11.5V${GROUND}Z`]),
    clear(tower, GAP),
    solid(tower),
    knock(circle(cx, 12.5, 1.25)),
    hole(`M${cx - 1 + stroke / 2} ${GROUND}V17.5A${1 - stroke / 2} ${1 - stroke / 2} 0 0 1 ${cx + 1 - stroke / 2} 17.5V${GROUND}Z`),
    `M${cx} 2.5V5.5`,
    `M${cx - 1} 3.5H${cx + 1}`,
    groundLine,
  ]
}
