import { center, centerScale, fillParts, plain } from '../monitor'
import { ban, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 显示器 + 禁止
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(ban(center, centerScale * visual.ban, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(ban(center, centerScale * visual.ban, radius)),
])
