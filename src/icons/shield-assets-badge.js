import { withBadge } from '../shield'
import { assets } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)
