import { base, center, centerScale } from '../calendar'
import { cloud } from '../symbols'
import { info } from '../tone'

// 日历 + 云
export default ({ radius }) => [
  ...base(radius),
  ...info(cloud(center, centerScale, radius)),
]
