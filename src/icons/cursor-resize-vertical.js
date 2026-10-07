import { crisp, rounded } from '../geometry'

// 上下缩放：一条竖直的线 + 两端 45° 箭头
const w = 3
export default ({ radius }) => [
  'M12.5 3V21',
  rounded([[9.5, 6], [12.5, 3], [15.5, 6]], crisp(radius), false),
  rounded([[9.5, 18], [12.5, 21], [15.5, 18]], crisp(radius), false),
]
