import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, video } from '../symbols'

// 日历 + 右下角视频
const k = cornerScale.video

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.video, badge, k), radius, stroke),
  ...video(badge, k, radius),
]
