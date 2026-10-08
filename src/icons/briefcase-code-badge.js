import { withBadge } from '../briefcase'
import { code } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
