import { withBadgeTop } from '../monitor'
import { gauge } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角计速器
export default ({ radius, stroke }) => withBadgeTop('gauge', gauge, info, radius, stroke)
