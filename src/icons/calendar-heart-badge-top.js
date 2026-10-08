import { withBadgeTop } from '../calendar'
import { heart } from '../symbols'
import { danger } from '../tone'

// 日历 + 右上角爱心
export default ({ radius, stroke }) => withBadgeTop('heart', heart, danger, radius, stroke)
