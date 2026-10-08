import { withBadgeTop } from '../book'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角星芒
export default ({ radius, stroke }) => withBadgeTop('sparkle', sparkle, accent, radius, stroke)
