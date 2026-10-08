import { plain, center, centerScale } from '../briefcase'
import { plus, visual } from '../symbols'
import { success } from '../tone'

// 公文包 + 加号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(plus(center, centerScale * visual.plus, radius)),
]
