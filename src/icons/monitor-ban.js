import { center, centerScale, plain } from '../monitor'
import { ban, visual } from '../symbols'
import { danger } from '../tone'

// 显示器 + 禁止
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(ban(center, centerScale * visual.ban, radius)),
]
