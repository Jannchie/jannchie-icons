import { withBadgeTop } from '../chat'
import { plus } from '../symbols'
import { success } from '../tone'

// 对话 + 右上角加号
export default ({ radius, stroke }) => withBadgeTop('plus', plus, success, radius, stroke)
