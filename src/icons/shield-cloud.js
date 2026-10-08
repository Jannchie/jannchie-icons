import { center, centerScale, plain } from '../shield'
import { cloud, visual } from '../symbols'
import { info } from '../tone'

// 盾 + 云；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...info(cloud(center, centerScale * visual.cloud, radius)),
]
