import { withBadge } from '../file'
import { ring } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角圆
export default ({ radius, stroke }) => withBadge('ring', ring, accent, radius, stroke)
