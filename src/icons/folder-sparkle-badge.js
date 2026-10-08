import { withBadge } from '../folder'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角星芒
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)
