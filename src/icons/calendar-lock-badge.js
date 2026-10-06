import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, lock } from '../symbols'

// 日历 + 右下角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.lock, badge, k), radius, stroke),
  ...lock(badge, k, radius),
]
