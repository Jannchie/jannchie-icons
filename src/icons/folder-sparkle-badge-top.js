import { withBadgeTop } from '../folder'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角星芒
export default ({ radius, stroke }) => withBadgeTop('sparkle', sparkle, accent, radius, stroke)
