import { circle, crisp, rounded } from '../geometry'

// 钻石：上方梯形 + 腰线 + 收到底部尖点的切面
export default ({ radius, stroke }) => [
  rounded([[7, 4], [17, 4], [21, 9], [12, 20.5], [3, 9]], Math.min(radius, 1)),
  'M3 9H21',
  'M9.5 9L12 20.5L14.5 9',
  'M7 4L9.5 9',
  'M17 4L14.5 9',
]
