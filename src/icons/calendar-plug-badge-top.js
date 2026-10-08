import { withBadgeTop } from '../calendar'
import { plug } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角插头
export default ({ radius, stroke }) => withBadgeTop('plug', plug, accent, radius, stroke)
