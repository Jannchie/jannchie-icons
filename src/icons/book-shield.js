import { plain, center, centerScale } from '../book'
import { shield, visual } from '../symbols'
import { success } from '../tone'

// 书 + 盾
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(shield(center, centerScale * visual.shield, radius)),
]
