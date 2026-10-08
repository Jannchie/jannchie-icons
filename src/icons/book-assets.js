import { plain, center, centerScale } from '../book'
import { assets } from '../symbols'
import { accent } from '../tone'

// 书 + 素材
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(assets(center, centerScale, radius)),
]
