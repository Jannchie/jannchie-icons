import { withBadgeTop } from '../calendar'
import { minus } from '../symbols'
import { danger } from '../tone'

// 日历 + 右上角减号
export default ({ radius, stroke }) => withBadgeTop('minus', minus, danger, radius, stroke)
