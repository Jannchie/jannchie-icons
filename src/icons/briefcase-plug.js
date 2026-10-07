import { plain, center, centerScale } from '../briefcase'
import { plug } from '../symbols'
import { accent } from '../tone'

// 公文包 + 插头
export default ({ radius }) => [
  ...plain(radius),
  ...accent(plug(center, centerScale, radius)),
]
