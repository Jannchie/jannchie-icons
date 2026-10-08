import { withBadge } from '../monitor'
import { code } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
