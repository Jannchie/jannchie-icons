import { plain, center, centerScale } from '../monitor'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 显示器 + 左箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowLeft(center, centerScale, radius)),
]
