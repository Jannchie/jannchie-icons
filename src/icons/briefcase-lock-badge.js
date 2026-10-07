import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, lock } from '../symbols'
import { warning } from '../tone'

// 公文包 + 右下角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.lock, badge, k), radius, stroke),
  ...warning(lock(badge, k, radius)),
]
