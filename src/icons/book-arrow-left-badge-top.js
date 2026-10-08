import { withBadgeTop } from '../book'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 书 + 右上角左箭头
export default ({ radius, stroke }) => withBadgeTop('arrowLeft', arrowLeft, info, radius, stroke)
