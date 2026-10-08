import { withBadge } from '../shield'
import { code } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
