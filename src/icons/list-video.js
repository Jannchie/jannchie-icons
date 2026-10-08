import { listBadge } from '../list'
import { cornerScale, outlines, video } from '../symbols'
import { accent } from '../tone'

// 列表 + 视频
const k = cornerScale.video

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.video, k, stroke, video, radius)
  return [...lines, ...accent(video(center, size, radius))]
}
