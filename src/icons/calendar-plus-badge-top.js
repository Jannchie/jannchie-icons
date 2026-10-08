import { withBadgeTop } from '../calendar'
import { plus } from '../symbols'
import { success } from '../tone'

// 日历 + 右上角加号
export default ({ radius, stroke }) => withBadgeTop('plus', plus, success, radius, stroke)
