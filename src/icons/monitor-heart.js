import { center, centerScale, plain } from '../monitor'
import { heart } from '../symbols'
import { danger } from '../tone'

// 显示器 + 爱心
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(heart(center, centerScale, radius)),
]
