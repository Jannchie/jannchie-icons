import { center, centerScale, plain } from '../monitor'
import { code, visual } from '../symbols'
import { accent } from '../tone'

// 显示器 + 代码
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(code(center, centerScale * visual.code, radius)),
]
