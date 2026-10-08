import { withBadge } from '../file'
import { assets } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)
