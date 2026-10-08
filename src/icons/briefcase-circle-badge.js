import { withBadge } from '../briefcase'
import { ring } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角圆
export default ({ radius, stroke }) => withBadge('ring', ring, accent, radius, stroke)
