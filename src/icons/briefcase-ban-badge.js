import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, ban } from '../symbols'

// 公文包 + 右下角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.ban, badge, k), radius, stroke),
  ...ban(badge, k, radius),
]
