import { listBadge, symbolFill } from '../list'
import { cornerScale, music, outlines, plus } from '../symbols'
import { accent, success } from '../tone'

// 添加到歌单：列表的前两行 + 右下角音符（同 list-music）+ 左下角加号，加号中心对齐第三行（行高见 list.js 的 listBadge）
const k = cornerScale.music

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.music, k, stroke, music, radius)
  return [...lines.slice(0, 2), ...success(plus([6.5, 3 + stroke / 2 + 12], 1, radius)), ...accent(music(center, size, radius))]
}

// 实心：行线、加号照旧，音符填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.music, k, stroke, music, radius)
  return [...lines.slice(0, 2), ...success(plus([6.5, 3 + stroke / 2 + 12], 1, radius)), ...accent(symbolFill('music', music(center, size, radius), stroke))]
}
