import { withBadge } from '../shield'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角星芒
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)
