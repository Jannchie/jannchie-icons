import { center, centerScale, plain } from '../monitor'
import { exclaim, visual } from '../symbols'
import { warning } from '../tone'

// 显示器 + 感叹号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(exclaim(center, centerScale * visual.exclaim, radius)),
]
