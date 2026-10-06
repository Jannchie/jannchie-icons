import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, video } from '../symbols'

// 对话 + 右下角视频
const k = cornerScale.video

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.video, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...video(badge, k, radius),
]
