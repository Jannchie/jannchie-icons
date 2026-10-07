import { withBadge } from '../shield'
import { star } from '../symbols'
import { warning } from '../tone'

// 盾 + 右下角收藏
export default ({ radius }) => withBadge('star', star, warning, radius)
