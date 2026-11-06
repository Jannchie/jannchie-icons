import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 二极管：贯穿的引线 + 指向右的三角 + 三角尖处的竖杠
export default ({ radius }) => [
  'M2.5 12H21.5',
  rounded([[8.5, 6.5], [15, 12], [8.5, 17.5]], crisp(radius)),
  'M15.5 6.5V17.5',
]

// 实心：三角填实（实心二极管符号），引线和竖杠照旧是线
export const fill = ({ radius }) => [
  'M2.5 12H21.5',
  solid(rounded([[8.5, 6.5], [15, 12], [8.5, 17.5]], crisp(radius))),
  'M15.5 6.5V17.5',
]
