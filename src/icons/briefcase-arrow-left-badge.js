import { withBadge } from '../briefcase'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)
