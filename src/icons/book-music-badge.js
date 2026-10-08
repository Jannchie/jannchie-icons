import { withBadge } from '../book'
import { music } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角音乐
export default ({ radius, stroke }) => withBadge('music', music, accent, radius, stroke)
