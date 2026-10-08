import { withBadgeTop } from '../folder'
import { plus } from '../symbols'
import { success } from '../tone'

// 文件夹 + 右上角加号
export default ({ radius, stroke }) => withBadgeTop('plus', plus, success, radius, stroke)
