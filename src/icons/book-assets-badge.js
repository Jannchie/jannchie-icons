import { withBadge } from '../book'
import { assets } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)
