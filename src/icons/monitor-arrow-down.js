import { center, centerScale, plain } from '../monitor'
import { arrowDown, visual } from '../symbols'
import { info } from '../tone'

// 显示器 + 下箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
]
