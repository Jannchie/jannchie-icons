import { withBadge } from '../calendar'
import { music } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角音乐
export default ({ radius, stroke }) => withBadge('music', music, accent, radius, stroke)
