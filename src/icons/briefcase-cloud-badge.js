import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, cloud } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角云
const k = cornerScale.cloud

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.cloud, badge, k), radius, stroke),
  ...info(cloud(badge, k, radius)),
]
