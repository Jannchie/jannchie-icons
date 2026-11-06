import { base, center, centerScale, fillParts } from '../calendar'
import { check, visual } from '../symbols'
import { success } from '../tone'
import { centerFill } from '../solid'

// 日历 + 勾
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...success(check(center, centerScale * visual.check, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...success(check(center, centerScale * visual.check, radius)),
])
