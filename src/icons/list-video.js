import { listBadge } from '../list'
import { cornerScale, outlines, video } from '../symbols'

// 列表 + 视频
const k = cornerScale.video

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.video, k, stroke)
  return [...lines, ...video(center, k, radius)]
}
