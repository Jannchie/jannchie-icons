import { shield } from '../symbols'
import { dot } from '../scene'

// 盾 + 感叹号
export default ({ radius, stroke }) => [
  ...shield([12, 12], 2.3),
  'M12 7.5V12.5',
  dot(12, 15.5),
]
