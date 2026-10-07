import { rounded } from '../geometry'

// 瀑布图：底线 + 首尾两根落地的柱 + 中间两根悬空、上下错开的柱
export default ({ radius }) => [
  // 四根柱宽 3、间距 1，柱边和柱顶都在 .5 上
  'M3 20.5H21',
  rounded([[4.5, 20.5], [4.5, 11.5], [7.5, 11.5], [7.5, 20.5]], Math.min(radius, 1), false),
  rounded([[8.5, 6.5], [11.5, 6.5], [11.5, 11.5], [8.5, 11.5]], Math.min(radius, 1)),
  rounded([[12.5, 6.5], [15.5, 6.5], [15.5, 9.5], [12.5, 9.5]], Math.min(radius, 1)),
  rounded([[16.5, 20.5], [16.5, 9.5], [19.5, 9.5], [19.5, 20.5]], Math.min(radius, 1), false),
]
