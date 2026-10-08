import { withBadge } from '../calendar'
import { ring } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角圆
export default ({ radius, stroke }) => withBadge('ring', ring, accent, radius, stroke)
