import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 移动：十字两条线 + 四端 45° 箭头（中心挪到 (12.5, 12.5)）
export default ({ radius }) => [
  'M12.5 3.5V21.5',
  'M3.5 12.5H21.5',
  ...[[12.5, 3.5, 'up'], [12.5, 21.5, 'down'], [3.5, 12.5, 'left'], [21.5, 12.5, 'right']].map(([x, y, d]) => rounded(arrow(x, y, d, 2.5), crisp(radius), false)),
]
