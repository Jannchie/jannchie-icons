import { withBadge } from '../book'
import { gauge } from '../symbols'
import { info } from '../tone'

// 书 + 右下角计速器
export default ({ radius, stroke }) => withBadge('gauge', gauge, info, radius, stroke)
