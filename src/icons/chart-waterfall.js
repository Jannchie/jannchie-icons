import { rounded } from '../geometry'

// 瀑布图：底线 + 首尾两根落地的柱 + 中间两根悬空、上下错开的柱
export default ({ radius }) => [
  'M3 20H21',
  rounded([[4.25, 20], [4.25, 12], [7.25, 12], [7.25, 20]], Math.min(radius, 1), false),
  rounded([[8.5, 7], [11.5, 7], [11.5, 12], [8.5, 12]], Math.min(radius, 1)),
  rounded([[12.75, 7], [15.75, 7], [15.75, 10], [12.75, 10]], Math.min(radius, 1)),
  rounded([[16.75, 20], [16.75, 10], [19.75, 10], [19.75, 20]], Math.min(radius, 1), false),
]
