import { withBadge } from '../file'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角拼图（模组）
export default ({ radius, stroke }) => withBadge('puzzle', puzzle, accent, radius, stroke)
