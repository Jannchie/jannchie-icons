import { crisp, rounded } from '../geometry'

// 二极管：贯穿的引线 + 指向右的三角 + 三角尖处的竖杠
export default ({ radius }) => [
  'M2.5 11.5H21.5',
  rounded([[8.5, 6], [15, 11.5], [8.5, 17]], crisp(radius)),
  'M15.5 6V17',
]
