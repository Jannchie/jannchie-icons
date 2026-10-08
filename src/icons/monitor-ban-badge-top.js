import { withBadgeTop } from '../monitor'
import { ban } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右上角禁止
export default ({ radius, stroke }) => withBadgeTop('ban', ban, danger, radius, stroke)
