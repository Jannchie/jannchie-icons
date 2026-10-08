import { withBadgeTop } from '../book'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角拼图（模组）
export default ({ radius, stroke }) => withBadgeTop('puzzle', puzzle, accent, radius, stroke)
