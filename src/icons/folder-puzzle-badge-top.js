import { withBadgeTop } from '../folder'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角拼图（模组）
export default ({ radius, stroke }) => withBadgeTop('puzzle', puzzle, accent, radius, stroke)
