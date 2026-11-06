import { base, center, centerScale, fillParts } from '../calendar'
import { puzzle, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 日历 + 拼图（模组）
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
])
