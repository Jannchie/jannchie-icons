import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, music } from '../symbols'

// 日历 + 右下角音乐
const k = cornerScale.music

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.music, badge, k), radius, stroke),
  ...music(badge, k, radius),
]
