import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, video } from '../symbols'

// 文件 + 右下角视频
const k = cornerScale.video

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.video, badge, k), stroke, radius), radius, false),
  flap,
  ...video(badge, k, radius),
]
