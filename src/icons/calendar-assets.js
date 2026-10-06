import { base, center, centerScale } from '../calendar'
import { assets } from '../symbols'

// 日历 + 素材
export default ({ radius }) => [
  ...base(radius),
  ...assets(center, centerScale, radius),
]
