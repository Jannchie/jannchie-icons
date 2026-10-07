import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, check } from '../symbols'
import { success } from '../tone'

// 书 + 右下角勾
const k = cornerScale.check

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.check, badge, k), radius, stroke),
  ...success(check(badge, k, radius)),
]
