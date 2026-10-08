import { withBadge } from '../calendar'
import { plug } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角插头
export default ({ radius, stroke }) => withBadge('plug', plug, accent, radius, stroke)
