import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'
import { knock, solid } from '../solid'

// 摩天楼：两级退台的高塔，顶上天线；下段三道竖向窗带
const cx = 12
const tower = (radius, closed) => rounded([[cx - 5, GROUND], [cx - 5, 9.5], [cx - 3, 9.5], [cx - 3, 5.5], [cx + 3, 5.5], [cx + 3, 9.5], [cx + 5, 9.5], [cx + 5, GROUND]], radius, closed)
const antenna = `M${cx} 2V5.5`
const windows = [-2, 0, 2].map(dx => ({ d: `M${cx + dx} 12.5V18.5`, thin: true }))

export default ({ radius }) => [
  groundLine,
  tower(radius, false),
  antenna,
  ...windows,
]

// 实心：塔身填实，三道窗带挖空；天线、地平线照旧是线
export const fill = ({ radius }) => [
  solid(tower(radius, true)),
  knock(windows),
  antenna,
  groundLine,
]
