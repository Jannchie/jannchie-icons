import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, assets } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.assets, badge, k), radius, stroke),
  ...accent(assets(badge, k, radius)),
]
