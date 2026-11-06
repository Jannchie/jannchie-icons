import { base, center, centerScale, fillParts } from '../calendar'
import { ban, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 日历 + 禁止
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...danger(ban(center, centerScale * visual.ban, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(ban(center, centerScale * visual.ban, radius)),
])
