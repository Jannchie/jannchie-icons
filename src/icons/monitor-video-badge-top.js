import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { cornerScale, outlines, video } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角视频
const k = cornerScale.video

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.video, badgeTop, k), radius, stroke),
  ...accent(video(badgeTop, k, radius)),
]
