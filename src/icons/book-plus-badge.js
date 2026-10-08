import { withBadge } from '../book'
import { plus } from '../symbols'
import { success } from '../tone'

// 书 + 右下角加号
export default ({ radius, stroke }) => withBadge('plus', plus, success, radius, stroke)
