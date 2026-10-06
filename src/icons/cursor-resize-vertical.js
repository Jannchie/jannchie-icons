import { crisp, rounded } from '../geometry'

// 上下缩放：一条竖直的线 + 两端 45° 箭头
const w = 3
export default ({ radius }) => [
  'M12 3V21',
  rounded([[9, 6], [12, 3], [15, 6]], crisp(radius), false),
  rounded([[9, 18], [12, 21], [15, 18]], crisp(radius), false),
]
