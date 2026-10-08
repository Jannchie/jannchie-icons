import { withBadgeTop } from '../chat'
import { assets } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角素材
export default ({ radius, stroke }) => withBadgeTop('assets', assets, accent, radius, stroke)
