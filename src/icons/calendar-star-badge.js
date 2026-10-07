import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, star } from '../symbols'
import { warning } from '../tone'

// 日历 + 右下角收藏
const k = cornerScale.star

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.star, badge, k), radius, stroke),
  ...warning(star(badge, k, radius)),
]
