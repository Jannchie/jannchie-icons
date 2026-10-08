import { plain, center, centerScale } from '../book'
import { cloud, visual } from '../symbols'
import { info } from '../tone'

// 书 + 云
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(cloud(center, centerScale * visual.cloud, radius)),
]
