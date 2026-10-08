import { plain, center, centerScale } from '../briefcase'
import { code, visual } from '../symbols'
import { accent } from '../tone'

// 公文包 + 代码
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(code(center, centerScale * visual.code, radius)),
]
