import { withBadgeTop } from '../monitor'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角拼图（模组）
export default ({ radius, stroke }) => withBadgeTop('puzzle', puzzle, accent, radius, stroke)
