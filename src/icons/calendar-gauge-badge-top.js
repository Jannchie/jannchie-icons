import { withBadgeTop } from '../calendar'
import { gauge } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角计速器
export default ({ radius, stroke }) => withBadgeTop('gauge', gauge, info, radius, stroke)
