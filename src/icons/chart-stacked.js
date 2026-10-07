import { rounded } from '../geometry'

// 堆叠柱状图：底线 + 三根空心方柱，每根中间一道分层线
export default ({ radius }) => [
  // 柱宽 3、间距 3，柱边和横线都在 .5 上
  'M3 20.5H21',
  rounded([[4.5, 20.5], [4.5, 11.5], [7.5, 11.5], [7.5, 20.5]], Math.min(radius, 1), false),
  rounded([[10.5, 20.5], [10.5, 5.5], [13.5, 5.5], [13.5, 20.5]], Math.min(radius, 1), false),
  rounded([[16.5, 20.5], [16.5, 8.5], [19.5, 8.5], [19.5, 20.5]], Math.min(radius, 1), false),
  'M4.5 15.5H7.5',
  'M10.5 12.5H13.5',
  'M16.5 14.5H19.5',
]
