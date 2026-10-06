import { circle, rounded } from '../geometry'
import { rotate } from '../transform'

// 糖果：中间圆形糖 + 两端蝴蝶结包装，整体沿 \ 方向斜放
export default ({ radius }) => [
  rotate(circle(12, 12, 4), 45),
  rotate(rounded([[8, 12], [3.5, 8.5], [3.5, 15.5]], Math.min(radius, 1)), 45),
  rotate(rounded([[16, 12], [20.5, 8.5], [20.5, 15.5]], Math.min(radius, 1)), 45),
]
