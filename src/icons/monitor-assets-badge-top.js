import { withBadgeTop } from '../monitor'
import { assets } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角素材
export default ({ radius, stroke }) => withBadgeTop('assets', assets, accent, radius, stroke)
