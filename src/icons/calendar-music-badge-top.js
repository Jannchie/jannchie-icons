import { withBadgeTop } from '../calendar'
import { music } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角音乐
export default ({ radius, stroke }) => withBadgeTop('music', music, accent, radius, stroke)
