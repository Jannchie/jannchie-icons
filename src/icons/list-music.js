import { listBadge } from '../list'
import { cornerScale, outlines, music } from '../symbols'
import { accent } from '../tone'

// 列表 + 音乐
const k = cornerScale.music

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.music, k, stroke)
  return [...lines, ...accent(music(center, k, radius))]
}
