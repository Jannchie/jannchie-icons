import { withBadge } from '../briefcase'
import { ban } from '../symbols'
import { danger } from '../tone'

// 公文包 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
