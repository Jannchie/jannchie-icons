import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, image, outlines } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角图片
const k = cornerScale.image

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.image, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...accent(image(badge, k, radius)),
]
