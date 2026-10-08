import { withBadge } from '../calendar'
import { star } from '../symbols'
import { warning } from '../tone'

// 日历 + 右下角收藏
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)
