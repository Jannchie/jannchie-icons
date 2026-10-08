import { withBadge } from '../folder'
import { gauge } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角计速器
export default ({ radius, stroke }) => withBadge('gauge', gauge, info, radius, stroke)
