import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

// 银行：古典式门廊，三角山花、四根柱、一级台基；柱距 3，都落在 .5 上
const columns = [7.5, 10.5, 13.5, 16.5]

export default ({ radius }) => [
  groundLine,
  rounded([[3.5, 9.5], [12, 4], [20.5, 9.5]], radius),
  ...columns.map(x => `M${x} 9.5V17.5`),
  rounded([[3.5, GROUND], [3.5, 17.5], [20.5, 17.5], [20.5, GROUND]], radius, false),
]
