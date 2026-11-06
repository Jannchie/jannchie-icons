import { center, centerScale, fillParts, plain } from '../monitor'
import { exclaim, visual } from '../symbols'
import { warning } from '../tone'
import { centerFill } from '../solid'

// 显示器 + 感叹号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(exclaim(center, centerScale * visual.exclaim, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...warning(exclaim(center, centerScale * visual.exclaim, radius)),
])
