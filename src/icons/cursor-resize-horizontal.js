import { crisp, rounded } from '../geometry'

// 左右缩放：一条水平的线 + 两端 45° 箭头
const w = 3
export default ({ radius }) => [
  'M3 11.5H21',
  rounded([[6, 8.5], [3, 11.5], [6, 14.5]], crisp(radius), false),
  rounded([[18, 8.5], [21, 11.5], [18, 14.5]], crisp(radius), false),
]
