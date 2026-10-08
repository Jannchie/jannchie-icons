import { withBadge } from '../book'
import { star } from '../symbols'
import { warning } from '../tone'

// 书 + 右下角收藏
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)
