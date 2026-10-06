import { circle } from '../geometry'
import { rotate, scale } from '../transform'

// 匕首：短剑身 + 护手 + 握柄 + 柄头；竖着画再逆时针转 45°，再放大 1.25 倍，和剑、弓等其他武器占的格子一样大
export default ({ radius }) => [
  scale(rotate('M10.75 13V7L12 4.5L13.25 7V13', -45), 1.25),
  scale(rotate('M9 13H15', -45), 1.25),
  scale(rotate('M12 13V17.5', -45), 1.25),
  scale(rotate(circle(12, 18.75, 1.25), -45), 1.25),
]
