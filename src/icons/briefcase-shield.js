import { plain, center, centerScale } from '../briefcase'
import { shield, visual } from '../symbols'
import { success } from '../tone'

// 公文包 + 盾
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(shield(center, centerScale * visual.shield, radius)),
]
