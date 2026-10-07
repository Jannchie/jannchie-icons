import { plain, center, centerScale } from '../monitor'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 显示器 + 右箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowRight(center, centerScale, radius)),
]
