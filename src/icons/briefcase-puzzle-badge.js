import { withBadge } from '../briefcase'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角拼图（模组）
export default ({ radius, stroke }) => withBadge('puzzle', puzzle, accent, radius, stroke)
