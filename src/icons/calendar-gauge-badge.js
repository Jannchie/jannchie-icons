import { withBadge } from '../calendar'
import { gauge } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角计速器
export default ({ radius, stroke }) => withBadge('gauge', gauge, info, radius, stroke)
