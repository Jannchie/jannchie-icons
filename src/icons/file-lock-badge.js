import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, lock, outlines } from '../symbols'

// 文件 + 右下角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.lock, badge, k), stroke, radius), radius, false),
  flap,
  ...lock(badge, k, radius),
]
