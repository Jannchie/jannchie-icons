import { center, centerScale, plain } from '../monitor'
import { assets, visual } from '../symbols'
import { accent } from '../tone'

// 显示器 + 素材
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(assets(center, centerScale * visual.assets, radius)),
]
