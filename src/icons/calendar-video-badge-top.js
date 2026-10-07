import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { cornerScale, outlines, video } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角视频
const k = cornerScale.video

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.video, badgeTop, k), radius, stroke),
  ...accent(video(badgeTop, k, radius)),
]
