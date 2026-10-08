import { withBadge } from '../monitor'
import { star } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右下角收藏
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)
