import { circle, crisp, rounded } from '../geometry'

// 钻石：上方梯形 + 腰线 + 收到底部尖点的切面
export default ({ radius, stroke }) => [
  rounded([[7, 3.5], [17, 3.5], [21, 8.5], [12, 20], [3, 8.5]], Math.min(radius, 1)),
  'M3 8.5H21',
  'M9.5 8.5L12 20L14.5 8.5',
  'M7 3.5L9.5 8.5',
  'M17 3.5L14.5 8.5',
]
