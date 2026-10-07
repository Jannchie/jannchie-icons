import { withBadge } from '../pin'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角闪光
export default ({ radius }) => withBadge('sparkle', sparkle, accent, radius)
