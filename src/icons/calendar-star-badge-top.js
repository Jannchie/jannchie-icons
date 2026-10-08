import { withBadgeTop } from '../calendar'
import { star } from '../symbols'
import { warning } from '../tone'

// 日历 + 右上角收藏
export default ({ radius, stroke }) => withBadgeTop('star', star, warning, radius, stroke)
