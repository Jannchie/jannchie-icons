import { plain, center, centerScale } from '../monitor'
import { check } from '../symbols'
import { success } from '../tone'

// 显示器 + 勾
export default ({ radius }) => [
  ...plain(radius),
  ...success(check(center, centerScale, radius)),
]
