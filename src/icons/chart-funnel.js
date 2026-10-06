import { rounded } from '../geometry'

// 漏斗图：45° 斜边的漏斗 + 两道分层线
export default ({ radius }) => [
  rounded([[3, 4], [21, 4], [13.5, 11.5], [13.5, 20], [10.5, 20], [10.5, 11.5]], Math.min(radius, 1)),
  'M6.5 7.5H17.5',
  'M10.5 11.5H13.5',
]
