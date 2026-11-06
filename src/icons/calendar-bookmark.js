import { base, center, centerScale, fillParts } from '../calendar'
import { bookmark, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 日历 + 书签
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
])
