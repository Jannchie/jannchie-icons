import { withBadge } from '../book'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 书 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)
