import { withBadge } from '../calendar'
import { plus } from '../symbols'
import { success } from '../tone'

// 日历 + 右下角加号
export default ({ radius, stroke }) => withBadge('plus', plus, success, radius, stroke)
