import { center, centerScale, plain } from '../shield'
import { assets, visual } from '../symbols'
import { accent } from '../tone'

// 盾 + 素材；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(assets(center, centerScale * visual.assets, radius)),
]
