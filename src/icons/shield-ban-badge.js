import { withBadge } from '../shield'
import { ban } from '../symbols'
import { danger } from '../tone'

// 盾 + 右下角禁止
export default ({ radius }) => withBadge('ban', ban, danger, radius)
