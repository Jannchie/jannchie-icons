import { center, centerScale, plain } from '../monitor'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 显示器 + 上箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowUp(center, centerScale, radius)),
]
