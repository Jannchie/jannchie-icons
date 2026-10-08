import { center, centerScale, plain } from '../monitor'
import { arrowLeft, visual } from '../symbols'
import { info } from '../tone'

// 显示器 + 左箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowLeft(center, centerScale * visual.arrowLeft, radius)),
]
