import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, star } from '../symbols'
import { warning } from '../tone'

// 文件 + 右下角收藏
const k = cornerScale.star

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.star, badge, k), stroke, radius), radius, false),
  flap,
  ...warning(star(badge, k, radius)),
]
