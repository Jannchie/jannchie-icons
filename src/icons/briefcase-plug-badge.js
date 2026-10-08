import { withBadge } from '../briefcase'
import { plug } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角插头
export default ({ radius, stroke }) => withBadge('plug', plug, accent, radius, stroke)
