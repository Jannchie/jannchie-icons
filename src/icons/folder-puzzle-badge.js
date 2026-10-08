import { withBadge } from '../folder'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角拼图（模组）
export default ({ radius, stroke }) => withBadge('puzzle', puzzle, accent, radius, stroke)
