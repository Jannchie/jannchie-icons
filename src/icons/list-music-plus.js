import { listBadge } from '../list'
import { cornerScale, music, outlines, plus } from '../symbols'
import { accent, success } from '../tone'

// 添加到歌单：列表的前两行（4.5 / 9.5）+ 右下角音符（同 list-music）+ 左下角加号（中心 6.5, 16.5）
const k = cornerScale.music

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.music, k, stroke)
  return [...lines.slice(0, 2), ...success(plus([6.5, 16.5], 1, radius)), ...accent(music(center, size, radius))]
}
