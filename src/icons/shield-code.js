import { center, centerScale, fillParts, plain } from '../shield'
import { code, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 盾 + 代码；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(code(center, centerScale * visual.code, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(code(center, centerScale * visual.code, radius)),
])
