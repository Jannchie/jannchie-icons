import { plain, center, centerScale } from '../monitor'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 显示器 + 上箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowUp(center, centerScale, radius)),
]
