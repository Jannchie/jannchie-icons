import { withBadge } from '../mail'
import { plus } from '../symbols'
import { success } from '../tone'

// 邮件 + 右下角加号
export default ({ radius, stroke }) => withBadge('plus', plus, success, radius, stroke)
