import { withBadgeTop } from '../book'
import { star } from '../symbols'
import { warning } from '../tone'

// 书 + 右上角收藏
export default ({ radius, stroke }) => withBadgeTop('star', star, warning, radius, stroke)
