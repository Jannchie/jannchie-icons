import { center, centerScale, fillParts, plain } from '../monitor'
import { code, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 显示器 + 代码
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(code(center, centerScale * visual.code, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(code(center, centerScale * visual.code, radius)),
])
