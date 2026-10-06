import { rounded } from '../geometry'

// 向下的小三角（45°）
export default ({ radius }) => [
  rounded([[7, 9.5], [12, 14.5], [17, 9.5]], Math.min(radius, 1)),
]
