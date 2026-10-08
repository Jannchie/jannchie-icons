import { withBadge } from '../book'
import { plug } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角插头
export default ({ radius, stroke }) => withBadge('plug', plug, accent, radius, stroke)
