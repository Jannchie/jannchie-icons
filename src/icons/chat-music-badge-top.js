import { withBadgeTop } from '../chat'
import { music } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角音乐
export default ({ radius, stroke }) => withBadgeTop('music', music, accent, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('music', music, accent, radius, stroke, { fill: true })
