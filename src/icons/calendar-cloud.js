import { base, center, centerScale } from '../calendar'
import { cloud, visual } from '../symbols'
import { info } from '../tone'

// 日历 + 云
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(cloud(center, centerScale * visual.cloud, radius)),
]
