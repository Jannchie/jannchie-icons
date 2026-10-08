import { circle, crisp, rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

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
