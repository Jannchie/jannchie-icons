import { circle, crisp, rounded } from '../geometry'

// 地图：三折的折页 + 两道折痕
export default ({ radius, stroke }) => [
  rounded([[3, 6], [9, 3.5], [15, 6], [21, 3.5], [21, 18], [15, 20.5], [9, 18], [3, 20.5]], Math.min(radius, 1)),
  'M9 3.5V18',
  'M15 6V20.5',
]
