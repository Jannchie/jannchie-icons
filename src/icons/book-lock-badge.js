import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, lock } from '../symbols'
import { warning } from '../tone'

// 书 + 右下角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.lock, badge, k), radius, stroke),
  ...warning(lock(badge, k, radius)),
]
