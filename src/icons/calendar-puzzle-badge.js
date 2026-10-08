import { withBadge } from '../calendar'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角拼图（模组）
export default ({ radius, stroke }) => withBadge('puzzle', puzzle, accent, radius, stroke)
