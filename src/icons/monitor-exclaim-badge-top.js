import { withBadgeTop } from '../monitor'
import { exclaim } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右上角感叹号
export default ({ radius, stroke }) => withBadgeTop('exclaim', exclaim, warning, radius, stroke)
