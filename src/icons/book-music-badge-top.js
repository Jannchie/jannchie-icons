import { withBadgeTop } from '../book'
import { music } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角音乐
export default ({ radius, stroke }) => withBadgeTop('music', music, accent, radius, stroke)
