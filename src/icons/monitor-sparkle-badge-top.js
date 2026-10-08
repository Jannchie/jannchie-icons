import { withBadgeTop } from '../monitor'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角星芒
export default ({ radius, stroke }) => withBadgeTop('sparkle', sparkle, accent, radius, stroke)
