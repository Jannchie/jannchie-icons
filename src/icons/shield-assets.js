import { center, centerScale, plain } from '../shield'
import { assets } from '../symbols'
import { accent } from '../tone'

// 盾 + 素材；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(assets(center, centerScale, radius)),
]
