import { plain, center, centerScale } from '../briefcase'
import { assets } from '../symbols'
import { accent } from '../tone'

// 公文包 + 素材
export default ({ radius }) => [
  ...plain(radius),
  ...accent(assets(center, centerScale, radius)),
]
