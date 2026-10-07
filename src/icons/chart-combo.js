import { rounded } from '../geometry'
import { dot } from '../scene'

// 组合图：底线 + 三根空心方柱（宽 3、间距 3，柱边都在 .5 上）+ 上方一条带节点的折线
export default ({ radius }) => [
  'M3 20.5H21',
  rounded([[4.5, 20.5], [4.5, 14.5], [7.5, 14.5], [7.5, 20.5]], Math.min(radius, 1), false),
  rounded([[10.5, 20.5], [10.5, 12.5], [13.5, 12.5], [13.5, 20.5]], Math.min(radius, 1), false),
  rounded([[16.5, 20.5], [16.5, 15.5], [19.5, 15.5], [19.5, 20.5]], Math.min(radius, 1), false),
  'M6 8.5L12 5L18 7.5',
  dot(6, 8.5),
  dot(12, 5),
  dot(18, 7.5),
]
