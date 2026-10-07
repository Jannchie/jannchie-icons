import { plain, center, centerScale } from '../monitor'
import { ban } from '../symbols'
import { danger } from '../tone'

// 显示器 + 禁止
export default ({ radius }) => [
  ...plain(radius),
  ...danger(ban(center, centerScale, radius)),
]
