import { center, centerScale, fillParts, plain } from '../book'
import { shield, visual } from '../symbols'
import { success } from '../tone'
import { centerFill } from '../solid'

// 书 + 盾
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(shield(center, centerScale * visual.shield, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...success(shield(center, centerScale * visual.shield, radius)),
])
