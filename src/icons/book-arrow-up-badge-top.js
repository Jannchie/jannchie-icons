import { withBadgeTop } from '../book'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 书 + 右上角上箭头
export default ({ radius, stroke }) => withBadgeTop('arrowUp', arrowUp, info, radius, stroke)
