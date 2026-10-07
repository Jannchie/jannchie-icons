import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { assets, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.assets, badge, k), stroke, radius), radius, false),
  flap,
  ...accent(assets(badge, k, radius)),
]
