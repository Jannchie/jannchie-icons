import { center, centerScale, plain } from '../monitor'
import { plug, visual } from '../symbols'
import { accent } from '../tone'

// 显示器 + 插头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]
