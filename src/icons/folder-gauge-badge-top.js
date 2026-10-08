import { withBadgeTop } from '../folder'
import { gauge } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角计速器
export default ({ radius, stroke }) => withBadgeTop('gauge', gauge, info, radius, stroke)
