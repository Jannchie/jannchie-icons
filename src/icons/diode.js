import { crisp, rounded } from '../geometry'

// 二极管：贯穿的引线 + 指向右的三角 + 三角尖处的竖杠
export default ({ radius }) => [
  'M2.5 12H21.5',
  rounded([[8, 6.5], [15, 12], [8, 17.5]], crisp(radius)),
  'M15.5 6.5V17.5',
]
