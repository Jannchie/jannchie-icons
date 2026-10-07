import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, image, outlines } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角图片
const k = cornerScale.image

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.image, badgeTop, k), radius, stroke),
  ...accent(image(badgeTop, k, radius)),
]
