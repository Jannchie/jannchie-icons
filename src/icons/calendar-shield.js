import { base, center, centerScale, fillParts } from '../calendar'
import { shield, visual } from '../symbols'
import { success } from '../tone'
import { centerFill } from '../solid'

// 日历 + 盾
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...success(shield(center, centerScale * visual.shield, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...success(shield(center, centerScale * visual.shield, radius)),
])
