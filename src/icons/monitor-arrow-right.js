import { center, centerScale, plain } from '../monitor'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 显示器 + 右箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowRight(center, centerScale, radius)),
]
