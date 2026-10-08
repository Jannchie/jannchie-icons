import { center, centerScale, plain } from '../monitor'
import { check } from '../symbols'
import { success } from '../tone'

// 显示器 + 勾
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(check(center, centerScale, radius)),
]
