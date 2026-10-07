import { plain, center, centerScale } from '../book'
import { assets } from '../symbols'
import { accent } from '../tone'

// 书 + 素材
export default ({ radius }) => [
  ...plain(radius),
  ...accent(assets(center, centerScale, radius)),
]
