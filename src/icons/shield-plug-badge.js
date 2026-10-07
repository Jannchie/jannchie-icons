import { withBadge } from '../shield'
import { plug } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角插头
export default ({ radius }) => withBadge('plug', plug, accent, radius)
