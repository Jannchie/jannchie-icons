import { rounded } from '../geometry'
import { eaves } from '../roofs'
import { GROUND, groundLine } from '../scene'
import { knock, solid } from '../solid'

// 塔（五重塔的简化）：三层飞檐，自下而上收窄，每层之间露一小段塔身，顶上相轮
const cx = 12

export default ({ radius }) => [
  groundLine,
  `M${cx} 2.5V5.5`,
  eaves(cx, 5.5, 8.5, 1, 4, radius),
  `M${cx - 2} 8.5V10.5`,
  `M${cx + 2} 8.5V10.5`,
  eaves(cx, 10.5, 13.5, 2, 5, radius),
  `M${cx - 3} 13.5V15.5`,
  `M${cx + 3} 13.5V15.5`,
  eaves(cx, 15.5, 18.5, 3, 7, radius),
  `M${cx - 4} 18.5V${GROUND}`,
  `M${cx + 4} 18.5V${GROUND}`,
]

// 实心：三层飞檐和层间的塔身填实，每层檐口挖一道缝，层次不糊成一块；相轮、地平线照旧是线
const box = (l, t, r, b) => rounded([[l, t], [r, t], [r, b], [l, b]], 0)
export const fill = ({ radius }) => [
  solid([
    eaves(cx, 5.5, 8.5, 1, 4, radius),
    box(cx - 2, 8.5, cx + 2, 10.5),
    eaves(cx, 10.5, 13.5, 2, 5, radius),
    box(cx - 3, 13.5, cx + 3, 15.5),
    eaves(cx, 15.5, 18.5, 3, 7, radius),
    box(cx - 4, 18.5, cx + 4, GROUND),
  ]),
  knock([[8.5, 4], [13.5, 5], [18.5, 7]].map(([y, w]) => `M${cx - w} ${y}H${cx + w}`)),
  `M${cx} 2.5V5.5`,
  groundLine,
]
