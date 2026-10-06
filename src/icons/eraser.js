import { rounded } from '../geometry'
import { rotate } from '../transform'

// 橡皮擦：9 × 16 的胖方块 + 中间一道分隔线，先竖直画，再顺时针转 30°
export default ({ radius }) => [
  rotate(rounded([[7.5, 4], [16.5, 4], [16.5, 20], [7.5, 20]], Math.min(radius, 2)), 30),
  rotate('M7.5 13L16.5 13', 30),
]
