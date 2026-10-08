import { center, centerScale, plain } from '../monitor'
import { puzzle, visual } from '../symbols'
import { accent } from '../tone'

// 显示器 + 拼图（模组）
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
]
