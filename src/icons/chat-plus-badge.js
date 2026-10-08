import { withBadge } from '../chat'
import { plus } from '../symbols'
import { success } from '../tone'

// 对话 + 右下角加号
export default ({ radius, stroke }) => withBadge('plus', plus, success, radius, stroke)
