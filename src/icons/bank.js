import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

// 银行：古典式门廊，三角山花、四根柱、一级台基；柱距 3，都落在 .5 上
// 山花两端各有一小段竖直的檐口（高 0.75），不画成闭合三角形：三角形的底角只有约 33°，
// 大圆角、粗字重下两条边在锐角里挤成一团圆疙瘩；加了檐口后变成一个直角和一个约 120° 的钝角
const columns = [7.5, 10.5, 13.5, 16.5]

export default ({ radius }) => [
  groundLine,
  rounded([[3.5, 9.5], [3.5, 8.75], [12, 4], [20.5, 8.75], [20.5, 9.5]], radius),
  ...columns.map(x => `M${x} 9.5V17.5`),
  rounded([[3.5, GROUND], [3.5, 17.5], [20.5, 17.5], [20.5, GROUND]], radius, false),
]
