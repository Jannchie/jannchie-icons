import { withBadge } from '../folder'
import { code } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
