import { withBadgeTop } from '../book'
import { plus } from '../symbols'
import { success } from '../tone'

// 书 + 右上角加号
export default ({ radius, stroke }) => withBadgeTop('plus', plus, success, radius, stroke)
