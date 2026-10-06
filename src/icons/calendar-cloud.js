import { base, center, centerScale } from '../calendar'
import { cloud } from '../symbols'

// 日历 + 云
export default ({ radius }) => [
  ...base(radius),
  ...cloud(center, centerScale, radius),
]
