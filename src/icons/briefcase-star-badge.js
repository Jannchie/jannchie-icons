import { withBadge } from '../briefcase'
import { star } from '../symbols'
import { warning } from '../tone'

// 公文包 + 右下角收藏
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)
