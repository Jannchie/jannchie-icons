import { withBadge } from '../chat'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角拼图（模组）
export default ({ radius, stroke }) => withBadge('puzzle', puzzle, accent, radius, stroke)
