import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, plus } from '../symbols'
import { success } from '../tone'

// 书 + 右下角加号
const k = cornerScale.plus

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.plus, badge, k), radius, stroke),
  ...success(plus(badge, k, radius)),
]
