import { withBadge } from '../monitor'
import { shield } from '../symbols'
import { success } from '../tone'

// 显示器 + 右下角盾
export default ({ radius, stroke }) => withBadge('shield', shield, success, radius, stroke)
