import { withBadge } from '../book'
import { code } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
