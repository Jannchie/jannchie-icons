import { withBadge } from '../shield'
import { music } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角音乐
export default ({ radius, stroke }) => withBadge('music', music, accent, radius, stroke)
