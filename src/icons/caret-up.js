import { rounded } from '../geometry'
import { solid } from '../solid'

// 向上的小三角（45°）
export default ({ radius }) => [
  rounded([[7, 14.5], [12, 9.5], [17, 14.5]], Math.min(radius, 1)),
]

// 实心：整个三角
export const fill = ({ radius }) => [solid(rounded([[7, 14.5], [12, 9.5], [17, 14.5]], Math.min(radius, 1)))]
