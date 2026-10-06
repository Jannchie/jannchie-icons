import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, video } from '../symbols'

// 显示器 + 右下角视频
const k = cornerScale.video

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.video, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...video(badge, k, radius)]
}
