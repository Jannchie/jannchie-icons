import { rounded } from '../geometry'

// 向上的小三角（45°）
export default ({ radius }) => [
  rounded([[7, 14.5], [12, 9.5], [17, 14.5]], Math.min(radius, 1)),
]
