import { withBadge } from '../calendar'
import { heart } from '../symbols'
import { danger } from '../tone'

// 日历 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)
