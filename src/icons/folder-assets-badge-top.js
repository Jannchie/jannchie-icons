import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { assets, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.assets, badgeTop, k), radius, stroke),
  ...accent(assets(badgeTop, k, radius)),
]
