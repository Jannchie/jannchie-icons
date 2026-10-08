import { plain, center, centerScale } from '../book'
import { ban, visual } from '../symbols'
import { danger } from '../tone'

// 书 + 禁止
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(ban(center, centerScale * visual.ban, radius)),
]
