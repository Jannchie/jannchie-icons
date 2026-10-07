import { crisp, rounded } from '../geometry'

// 上升趋势：45° 折线往右上走，末端斜向箭头（一翼水平、一翼竖直）
export default ({ radius }) => [
  rounded([[3, 17], [9, 11], [13, 15], [20.5, 7.5]], Math.min(radius, 1), false),
  rounded([[16.25, 7.5], [20.5, 7.5], [20.5, 11.75]], crisp(radius), false),
]
