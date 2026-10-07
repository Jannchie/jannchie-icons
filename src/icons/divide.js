import { dot } from '../scene'

// 除号：中间横线 + 上下各一点
export default ({ radius }) => [
  'M5 11.5H19',
  dot(12, 6.25, 2.5),
  dot(12, 16.75, 2.5),
]
