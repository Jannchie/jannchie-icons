import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, music, outlines } from '../symbols'

// 对话 + 右下角音乐
const k = cornerScale.music

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.music, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...music(badge, k, radius),
]
