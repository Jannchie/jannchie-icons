import { rounded } from '../geometry'
import { rotate, scale } from '../transform'

// 长矛：长杆 + 菱形矛头；竖着画再逆时针转 45°，再放大 1.15 倍，和剑、弓等其他武器占的格子一样大
export default ({ radius }) => [
  scale(rotate('M12 21.5V9.5', -45), 1.15),
  scale(rotate(rounded([[12, 2], [14.75, 6.25], [12, 9.5], [9.25, 6.25]], Math.min(radius, 0.75)), -45), 1.15),
]
