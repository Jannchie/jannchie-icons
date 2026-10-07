import { plain, center, centerScale } from '../monitor'
import { heart } from '../symbols'
import { danger } from '../tone'

// 显示器 + 爱心
export default ({ radius }) => [
  ...plain(radius),
  ...danger(heart(center, centerScale, radius)),
]
