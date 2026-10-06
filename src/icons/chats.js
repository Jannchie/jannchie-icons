import { circle, crisp, rounded } from '../geometry'

// 多个对话：后面的气泡只画露出的部分，前面的气泡带尾巴
export default ({ radius, stroke }) => [
  rounded([[7, 12], [3, 12], [3, 3], [15, 3], [15, 7]], Math.min(radius, 2), false),
  rounded([[8.5, 8.5], [21, 8.5], [21, 17.5], [8.5, 17.5]], Math.min(radius, 2)),
  'M16 17.5L19 20.5V17.5',
]
