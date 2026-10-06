import { rounded } from '../geometry'
import { dot } from '../scene'

// 组合图：底线 + 三根空心方柱 + 上方一条带节点的折线
export default ({ radius }) => [
  'M3 20H21',
  rounded([[4.75, 20], [4.75, 14], [8.25, 14], [8.25, 20]], Math.min(radius, 1), false),
  rounded([[10.25, 20], [10.25, 12], [13.75, 12], [13.75, 20]], Math.min(radius, 1), false),
  rounded([[15.75, 20], [15.75, 15.5], [19.25, 15.5], [19.25, 20]], Math.min(radius, 1), false),
  'M6.5 8.5L12 5L17.5 7.5',
  dot(6.5, 8.5),
  dot(12, 5),
  dot(17.5, 7.5),
]
