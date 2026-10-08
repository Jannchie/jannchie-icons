import { withBadgeTop } from '../book'
import { assets } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角素材
export default ({ radius, stroke }) => withBadgeTop('assets', assets, accent, radius, stroke)
