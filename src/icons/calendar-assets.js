import { base, center, centerScale } from '../calendar'
import { assets } from '../symbols'
import { accent } from '../tone'

// 日历 + 素材
export default ({ radius }) => [
  ...base(radius),
  ...accent(assets(center, centerScale, radius)),
]
