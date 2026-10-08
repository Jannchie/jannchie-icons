import { withBadgeTop } from '../chat'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角星芒
export default ({ radius, stroke }) => withBadgeTop('sparkle', sparkle, accent, radius, stroke)
