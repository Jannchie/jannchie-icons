import { withBadge } from '../book'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角星芒
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)
