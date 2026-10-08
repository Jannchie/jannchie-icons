import { withBadge } from '../mail'
import { assets } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)
