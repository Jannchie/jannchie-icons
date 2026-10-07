import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, assets } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.assets, badge, k), radius, stroke),
  ...accent(assets(badge, k, radius)),
]
