import { withBadge } from '../mail'
import { star } from '../symbols'
import { warning } from '../tone'

// 邮件 + 右下角收藏
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)
