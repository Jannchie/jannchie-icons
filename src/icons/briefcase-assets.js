import { plain, center, centerScale } from '../briefcase'
import { assets, visual } from '../symbols'
import { accent } from '../tone'

// 公文包 + 素材
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(assets(center, centerScale * visual.assets, radius)),
]
