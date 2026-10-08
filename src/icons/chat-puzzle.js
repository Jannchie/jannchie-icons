import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { puzzle, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 拼图（模组）
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
]
