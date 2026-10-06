import { dot } from '../scene'

// 除号：中间横线 + 上下各一点
export default ({ radius }) => [
  'M5 12H19',
  dot(12, 6.75, 2.5),
  dot(12, 17.25, 2.5),
]
