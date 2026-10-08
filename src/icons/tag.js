import { tagDiagonal, tagHole } from '../tag'

// 标签：左上方角的斜放标签 + 穿孔
export default ({ radius, stroke }) => [
  tagDiagonal(stroke, radius),
  tagHole(),
]
