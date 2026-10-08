import { withBadgeTop } from '../calendar'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角星芒
export default ({ radius, stroke }) => withBadgeTop('sparkle', sparkle, accent, radius, stroke)
