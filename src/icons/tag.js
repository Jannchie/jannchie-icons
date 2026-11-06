import { tagDiagonal, tagHole } from '../tag'
import { hole, solid } from '../solid'

// 标签：左上方角的斜放标签 + 穿孔
export default ({ radius, stroke }) => [
  tagDiagonal(stroke, radius),
  tagHole(),
]

// 实心：标签一块，穿孔挖空
export const fill = ({ radius, stroke }) => [solid(tagDiagonal(stroke, radius)), hole(tagHole())]
