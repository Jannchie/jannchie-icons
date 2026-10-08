import { withBadge } from '../briefcase'
import { assets } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)
