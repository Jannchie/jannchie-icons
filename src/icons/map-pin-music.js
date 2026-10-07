import { withBadge } from '../pin'
import { music } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角音符
export default ({ radius }) => withBadge('music', music, accent, radius)
