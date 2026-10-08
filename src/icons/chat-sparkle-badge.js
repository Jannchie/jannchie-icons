import { withBadge } from '../chat'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角星芒
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)
