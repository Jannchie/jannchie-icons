import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, music } from '../symbols'
import { accent } from '../tone'

// 列表 + 音乐
const k = cornerScale.music

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.music, k, stroke, music, radius)
  return [...lines, ...accent(music(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.music, k, stroke, music, radius)
  return [...lines, ...accent(symbolFill('music', music(center, size, radius), stroke))]
}
