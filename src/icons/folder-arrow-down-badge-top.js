import { withBadgeTop } from '../folder'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角下箭头
export default ({ radius, stroke }) => withBadgeTop('arrowDown', arrowDown, info, radius, stroke)
