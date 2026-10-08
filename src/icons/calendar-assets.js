import { base, center, centerScale } from '../calendar'
import { assets, visual } from '../symbols'
import { accent } from '../tone'

// 日历 + 素材
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(assets(center, centerScale * visual.assets, radius)),
]
