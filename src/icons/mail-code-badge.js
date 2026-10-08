import { withBadge } from '../mail'
import { code } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
