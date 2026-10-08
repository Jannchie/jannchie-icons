import { withBadge } from '../folder'
import { assets } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)
