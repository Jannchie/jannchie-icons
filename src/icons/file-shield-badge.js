import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, shield } from '../symbols'
import { success } from '../tone'

// 文件 + 右下角盾
const k = cornerScale.shield

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.shield, badge, k), stroke, radius), radius, false),
  flap,
  ...success(shield(badge, k, radius)),
]
