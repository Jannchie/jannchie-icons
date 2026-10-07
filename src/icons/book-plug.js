import { plain, center, centerScale } from '../book'
import { plug } from '../symbols'
import { accent } from '../tone'

// 书 + 插头
export default ({ radius }) => [
  ...plain(radius),
  ...accent(plug(center, centerScale, radius)),
]
