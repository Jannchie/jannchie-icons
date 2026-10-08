import { plain, center, centerScale } from '../book'
import { plug } from '../symbols'
import { accent } from '../tone'

// 书 + 插头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(plug(center, centerScale, radius)),
]
