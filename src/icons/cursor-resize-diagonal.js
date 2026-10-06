import { crisp, rounded } from '../geometry'

// 斜向缩放：一条左上到右下 45°的线 + 两端 45° 箭头
const w = 3
export default ({ radius }) => [
  'M4.5 4.5L19.5 19.5',
  rounded([[4.5, 8.75], [4.5, 4.5], [8.75, 4.5]], crisp(radius), false),
  rounded([[19.5, 15.25], [19.5, 19.5], [15.25, 19.5]], crisp(radius), false),
]
