import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, lock, outlines } from '../symbols'
import { warning } from '../tone'

// 对话 + 右下角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.lock, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...warning(lock(badge, k, radius)),
]
