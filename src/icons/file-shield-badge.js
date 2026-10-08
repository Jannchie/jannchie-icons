import { withBadge } from '../file'
import { shield } from '../symbols'
import { success } from '../tone'

// 文件 + 右下角盾
export default ({ radius, stroke }) => withBadge('shield', shield, success, radius, stroke)
