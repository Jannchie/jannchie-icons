import { plain, center, centerScale } from '../briefcase'
import { code } from '../symbols'
import { accent } from '../tone'

// 公文包 + 代码
export default ({ radius }) => [
  ...plain(radius),
  ...accent(code(center, centerScale, radius)),
]
