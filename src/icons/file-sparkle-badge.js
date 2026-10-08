import { withBadge } from '../file'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角星芒
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)
