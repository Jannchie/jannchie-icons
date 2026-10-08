import { withBadge } from '../folder'
import { ring } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角圆
export default ({ radius, stroke }) => withBadge('ring', ring, accent, radius, stroke)
