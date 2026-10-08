import { plain, center, centerScale } from '../briefcase'
import { plug, visual } from '../symbols'
import { accent } from '../tone'

// 公文包 + 插头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]
