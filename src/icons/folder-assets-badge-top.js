import { withBadgeTop } from '../folder'
import { assets } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角素材
export default ({ radius, stroke }) => withBadgeTop('assets', assets, accent, radius, stroke)
