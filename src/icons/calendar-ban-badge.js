import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, ban } from '../symbols'
import { danger } from '../tone'

// 日历 + 右下角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.ban, badge, k), radius, stroke),
  ...danger(ban(badge, k, radius)),
]
