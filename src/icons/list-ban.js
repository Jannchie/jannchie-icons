import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, ban } from '../symbols'
import { danger } from '../tone'

// 列表 + 禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.ban, k, stroke, ban, radius)
  return [...lines, ...danger(ban(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.ban, k, stroke, ban, radius)
  return [...lines, ...danger(symbolFill('ban', ban(center, size, radius), stroke))]
}
