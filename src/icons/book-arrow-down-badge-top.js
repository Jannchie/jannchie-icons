import { withBadgeTop } from '../book'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 书 + 右上角下箭头
export default ({ radius, stroke }) => withBadgeTop('arrowDown', arrowDown, info, radius, stroke)
