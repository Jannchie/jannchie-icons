import { withBadge } from '../file'
import { code } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
