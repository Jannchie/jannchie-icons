import { withBadgeTop } from '../folder'
import { shield } from '../symbols'
import { success } from '../tone'

// 文件夹 + 右上角盾
export default ({ radius, stroke }) => withBadgeTop('shield', shield, success, radius, stroke)
