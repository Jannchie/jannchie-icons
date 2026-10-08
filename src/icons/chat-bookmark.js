import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { bookmark, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 书签
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
]
