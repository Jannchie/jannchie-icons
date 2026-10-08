import { withBadge } from '../calendar'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)
