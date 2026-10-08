import { plain, center, centerScale } from '../briefcase'
import { cloud } from '../symbols'
import { info } from '../tone'

// 公文包 + 云
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(cloud(center, centerScale, radius)),
]
