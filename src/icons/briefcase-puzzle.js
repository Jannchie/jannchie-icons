import { plain, center, centerScale } from '../briefcase'
import { puzzle, visual } from '../symbols'
import { accent } from '../tone'

// 公文包 + 拼图（模组）
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
]
