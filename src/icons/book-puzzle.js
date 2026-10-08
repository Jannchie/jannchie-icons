import { plain, center, centerScale } from '../book'
import { puzzle, visual } from '../symbols'
import { accent } from '../tone'

// 书 + 拼图（模组）
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
]
