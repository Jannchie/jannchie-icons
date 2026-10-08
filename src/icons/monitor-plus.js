import { center, centerScale, plain } from '../monitor'
import { plus, visual } from '../symbols'
import { success } from '../tone'

// 显示器 + 加号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(plus(center, centerScale * visual.plus, radius)),
]
