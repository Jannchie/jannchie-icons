import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, plus } from '../symbols'
import { success } from '../tone'

// 文件 + 右下角加号
const k = cornerScale.plus

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.plus, badge, k), stroke, radius), radius, false),
  flap,
  ...success(plus(badge, k, radius)),
]
