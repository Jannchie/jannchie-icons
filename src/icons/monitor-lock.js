import { plain, center, centerScale } from '../monitor'
import { lock } from '../symbols'
import { warning } from '../tone'

// 显示器 + 锁
export default ({ radius }) => [
  ...plain(radius),
  ...warning(lock(center, centerScale, radius)),
]
