import { withBadgeTop } from '../calendar'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角拼图（模组）
export default ({ radius, stroke }) => withBadgeTop('puzzle', puzzle, accent, radius, stroke)
