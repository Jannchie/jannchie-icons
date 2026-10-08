import { withBadge } from '../mail'
import { ban } from '../symbols'
import { danger } from '../tone'

// 邮件 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
