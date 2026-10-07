import { shield } from '../symbols'
import { dot } from '../scene'

// 盾 + 感叹号；感叹号是正中单线，按统一规则往左偏半格到 11.5 才清晰
export default ({ radius, stroke }) => [
  ...shield([12, 12], 2.3),
  'M11.5 7.5V12.5',
  dot(11.5, 15.5),
]
