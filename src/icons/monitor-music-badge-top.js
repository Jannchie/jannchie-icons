import { withBadgeTop } from '../monitor'
import { music } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角音乐
export default ({ radius, stroke }) => withBadgeTop('music', music, accent, radius, stroke)
