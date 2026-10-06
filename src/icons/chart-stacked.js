import { rounded } from '../geometry'

// 堆叠柱状图：底线 + 三根空心方柱，每根中间一道分层线
export default ({ radius }) => [
  'M3 20H21',
  rounded([[4.75, 20], [4.75, 11], [8.25, 11], [8.25, 20]], Math.min(radius, 1), false),
  rounded([[10.25, 20], [10.25, 5], [13.75, 5], [13.75, 20]], Math.min(radius, 1), false),
  rounded([[15.75, 20], [15.75, 8.5], [19.25, 8.5], [19.25, 20]], Math.min(radius, 1), false),
  'M4.75 15.5H8.25',
  'M10.25 12.5H13.75',
  'M15.75 14.5H19.25',
]
