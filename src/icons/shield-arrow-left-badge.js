import { withBadge } from '../shield'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)
