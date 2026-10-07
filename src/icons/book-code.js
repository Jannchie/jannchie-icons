import { plain, center, centerScale } from '../book'
import { code } from '../symbols'
import { accent } from '../tone'

// 书 + 代码
export default ({ radius }) => [
  ...plain(radius),
  ...accent(code(center, centerScale, radius)),
]
