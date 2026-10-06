import { rounded } from '../geometry'

// 柱状图（方柱）：底线 + 三根空心方柱（宽 3.5、间距 2），柱底落在底线上
const column = (x, top, radius) => rounded([[x, 20], [x, top], [x + 3.5, top], [x + 3.5, 20]], Math.min(radius, 1), false)

export default ({ radius }) => [
  'M3 20H21',
  column(4.75, 11.5, radius),
  column(10.25, 4.5, radius),
  column(15.75, 8.5, radius),
]
