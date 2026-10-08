import { withBadge } from '../briefcase'
import { plus } from '../symbols'
import { success } from '../tone'

// 公文包 + 右下角加号
export default ({ radius, stroke }) => withBadge('plus', plus, success, radius, stroke)
