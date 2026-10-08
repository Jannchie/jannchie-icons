import { withBadge } from '../monitor'
import { exclaim } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右下角感叹号
export default ({ radius, stroke }) => withBadge('exclaim', exclaim, warning, radius, stroke)
