import { withBadgeTop } from '../chat'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角拼图（模组）
export default ({ radius, stroke }) => withBadgeTop('puzzle', puzzle, accent, radius, stroke)
