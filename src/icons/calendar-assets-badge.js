import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, assets } from '../symbols'

// 日历 + 右下角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.assets, badge, k), radius, stroke),
  ...assets(badge, k, radius),
]
