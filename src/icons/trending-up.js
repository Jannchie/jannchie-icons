import { crisp, rounded } from '../geometry'

// 上升趋势：45° 折线往右上走，末端斜向箭头（一翼水平、一翼竖直）
export default ({ radius }) => [
  rounded([[3, 17], [9, 11], [13, 15], [20, 8]], Math.min(radius, 1), false),
  rounded([[15.75, 8], [20, 8], [20, 12.25]], crisp(radius), false),
]
