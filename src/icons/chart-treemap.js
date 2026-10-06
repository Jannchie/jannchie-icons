import { rounded } from '../geometry'

// 矩形树图：方框里层层切分的矩形
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  'M12 3.5V20.5',
  'M3.5 13H12',
  'M12 10H20.5',
  'M16.25 10V20.5',
]
