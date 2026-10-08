import { center, centerScale, plain } from '../monitor'
import { cloud, visual } from '../symbols'
import { info } from '../tone'

// 显示器 + 云
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(cloud(center, centerScale * visual.cloud, radius)),
]
