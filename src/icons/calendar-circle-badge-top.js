import { withBadgeTop } from '../calendar'
import { ring } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角圆
export default ({ radius, stroke }) => withBadgeTop('ring', ring, accent, radius, stroke)
