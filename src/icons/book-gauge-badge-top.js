import { withBadgeTop } from '../book'
import { gauge } from '../symbols'
import { info } from '../tone'

// 书 + 右上角计速器
export default ({ radius, stroke }) => withBadgeTop('gauge', gauge, info, radius, stroke)
