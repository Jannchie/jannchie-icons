import { withBadgeTop } from '../monitor'
import { star } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右上角收藏
export default ({ radius, stroke }) => withBadgeTop('star', star, warning, radius, stroke)
