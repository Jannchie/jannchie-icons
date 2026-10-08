import { center, centerScale, plain } from '../monitor'
import { lock, visual } from '../symbols'
import { warning } from '../tone'

// 显示器 + 锁
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(lock(center, centerScale * visual.lock, radius)),
]
