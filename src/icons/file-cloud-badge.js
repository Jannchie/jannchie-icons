import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cloud, cornerScale, outlines } from '../symbols'

// 文件 + 右下角云
const k = cornerScale.cloud

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.cloud, badge, k), stroke, radius), radius, false),
  flap,
  ...cloud(badge, k, radius),
]
