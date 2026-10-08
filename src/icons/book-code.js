import { plain, center, centerScale } from '../book'
import { code, visual } from '../symbols'
import { accent } from '../tone'

// 书 + 代码
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(code(center, centerScale * visual.code, radius)),
]
