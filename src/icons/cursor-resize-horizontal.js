import { crisp, rounded } from '../geometry'

// 左右缩放：一条水平的线 + 两端 45° 箭头
const w = 3
export default ({ radius }) => [
  'M3 12H21',
  rounded([[6, 9], [3, 12], [6, 15]], crisp(radius), false),
  rounded([[18, 9], [21, 12], [18, 15]], crisp(radius), false),
]
