import { withBadge } from '../mail'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角拼图（模组）
export default ({ radius, stroke }) => withBadge('puzzle', puzzle, accent, radius, stroke)
