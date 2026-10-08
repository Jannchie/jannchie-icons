import { withBadge } from '../book'
import { ban } from '../symbols'
import { danger } from '../tone'

// 书 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
