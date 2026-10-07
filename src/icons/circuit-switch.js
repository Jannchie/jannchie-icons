import { dot } from '../scene'

// 开关（断开）：两端引线 + 两个接点 + 翘起的闸刀
export default ({ radius }) => [
  'M2.5 14.5H6.5',
  'M17.5 14.5H21.5',
  dot(7.5, 14.5, 2.5),
  dot(16.5, 14.5, 2.5),
  'M7.5 14.5L16 8.5',
]
