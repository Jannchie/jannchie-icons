import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

// 摩天楼：两级退台的高塔，顶上天线；下段三道竖向窗带
const cx = 12

export default ({ radius }) => [
  groundLine,
  rounded([[cx - 5, GROUND], [cx - 5, 9.5], [cx - 3, 9.5], [cx - 3, 5.5], [cx + 3, 5.5], [cx + 3, 9.5], [cx + 5, 9.5], [cx + 5, GROUND]], radius, false),
  `M${cx} 2V5.5`,
  ...[-2, 0, 2].map(dx => ({ d: `M${cx + dx} 12.5V18.5`, thin: true })),
]
