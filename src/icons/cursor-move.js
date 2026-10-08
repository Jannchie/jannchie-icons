import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 移动：十字两条线 + 四端 45° 箭头
export default ({ radius }) => [
  'M12 3V21',
  'M3 12H21',
  ...[[12, 3, 'up'], [12, 21, 'down'], [3, 12, 'left'], [21, 12, 'right']].map(([x, y, d]) => rounded(arrow(x, y, d, 2.5), crisp(radius), false)),
]
