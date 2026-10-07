import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, code } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角代码
const k = cornerScale.code

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.code, badge, k), radius, stroke),
  ...accent(code(badge, k, radius)),
]
