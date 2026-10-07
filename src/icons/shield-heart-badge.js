import { withBadge } from '../shield'
import { heart } from '../symbols'
import { danger } from '../tone'

// 盾 + 右下角爱心
export default ({ radius }) => withBadge('heart', heart, danger, radius)
