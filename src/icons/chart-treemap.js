import { rounded } from '../geometry'

// 矩形树图：方框里层层切分的矩形
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  'M12.5 3.5V20.5',
  'M3.5 12.5H12.5',
  'M12.5 9.5H20.5',
  'M16.5 9.5V20.5',
]
