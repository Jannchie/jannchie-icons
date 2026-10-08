import { withBadge } from '../monitor'
import { assets } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)
