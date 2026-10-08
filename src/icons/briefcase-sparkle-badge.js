import { withBadge } from '../briefcase'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角星芒
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)
