import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, video } from '../symbols'
import { accent } from '../tone'

// 列表 + 视频
const k = cornerScale.video

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.video, k, stroke, video, radius)
  return [...lines, ...accent(video(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.video, k, stroke, video, radius)
  return [...lines, ...accent(symbolFill('video', video(center, size, radius), stroke))]
}
