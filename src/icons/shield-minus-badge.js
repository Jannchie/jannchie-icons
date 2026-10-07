import { withBadge } from '../shield'
import { minus } from '../symbols'
import { danger } from '../tone'

// 盾 + 右下角减号
export default ({ radius }) => withBadge('minus', minus, danger, radius)
