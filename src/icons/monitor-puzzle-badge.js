import { withBadge } from '../monitor'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角拼图（模组）
export default ({ radius, stroke }) => withBadge('puzzle', puzzle, accent, radius, stroke)
