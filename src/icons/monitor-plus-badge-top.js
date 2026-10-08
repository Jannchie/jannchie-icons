import { withBadgeTop } from '../monitor'
import { plus } from '../symbols'
import { success } from '../tone'

// 显示器 + 右上角加号
export default ({ radius, stroke }) => withBadgeTop('plus', plus, success, radius, stroke)
