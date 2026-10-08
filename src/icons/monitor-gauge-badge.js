import { withBadge } from '../monitor'
import { gauge } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角计速器
export default ({ radius, stroke }) => withBadge('gauge', gauge, info, radius, stroke)
