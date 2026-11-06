import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { puzzle, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 对话 + 拼图（模组）
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
])
