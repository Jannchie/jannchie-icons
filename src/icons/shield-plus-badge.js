import { withBadge } from '../shield'
import { plus } from '../symbols'
import { success } from '../tone'

// 盾 + 右下角加号
export default ({ radius, stroke }) => withBadge('plus', plus, success, radius, stroke)
