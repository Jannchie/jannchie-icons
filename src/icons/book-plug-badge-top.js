import { withBadgeTop } from '../book'
import { plug } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角插头
export default ({ radius, stroke }) => withBadgeTop('plug', plug, accent, radius, stroke)
