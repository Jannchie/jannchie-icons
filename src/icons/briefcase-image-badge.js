import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, image } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角图片
const k = cornerScale.image

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.image, badge, k), radius, stroke),
  ...accent(image(badge, k, radius)),
]
