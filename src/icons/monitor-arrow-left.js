import { center, centerScale, plain } from '../monitor'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 显示器 + 左箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowLeft(center, centerScale, radius)),
]
