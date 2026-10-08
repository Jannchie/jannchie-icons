import { withBadge } from '../calendar'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角星芒
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)
