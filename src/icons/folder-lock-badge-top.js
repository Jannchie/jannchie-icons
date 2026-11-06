import { withBadgeTop } from '../folder'
import { lock } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 右上角锁
export default ({ radius, stroke }) => withBadgeTop('lock', lock, warning, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('lock', lock, warning, radius, stroke, { fill: true })
