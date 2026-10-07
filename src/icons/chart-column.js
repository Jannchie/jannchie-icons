import { rounded } from '../geometry'

// 柱状图（方柱）：底线 + 三根空心方柱（宽 3、间距 3，柱边都在 .5 上），柱底落在底线上
const column = (x, top, radius) => rounded([[x, 20.5], [x, top], [x + 3, top], [x + 3, 20.5]], Math.min(radius, 1), false)

export default ({ radius }) => [
  'M3 20.5H21',
  column(4.5, 11.5, radius),
  column(10.5, 4.5, radius),
  column(16.5, 8.5, radius),
]
