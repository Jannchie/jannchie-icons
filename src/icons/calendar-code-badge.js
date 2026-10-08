import { withBadge } from '../calendar'
import { code } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角代码
export default ({ radius, stroke }) => withBadge('code', code, accent, radius, stroke)
