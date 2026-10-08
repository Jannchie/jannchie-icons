import { withBadge } from '../briefcase'
import { music } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角音乐
export default ({ radius, stroke }) => withBadge('music', music, accent, radius, stroke)
