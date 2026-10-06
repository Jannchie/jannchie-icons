import { plain, center, centerScale } from '../briefcase'
import { assets } from '../symbols'

// 公文包 + 素材
export default ({ radius }) => [
  ...plain(radius),
  ...assets(center, centerScale, radius),
]
