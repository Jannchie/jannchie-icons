import { withBadgeTop } from '../calendar'
import { code } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角代码
export default ({ radius, stroke }) => withBadgeTop('code', code, accent, radius, stroke)
