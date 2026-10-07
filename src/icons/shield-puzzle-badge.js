import { withBadge } from '../shield'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角拼图（模组）
export default ({ radius }) => withBadge('puzzle', puzzle, accent, radius)
