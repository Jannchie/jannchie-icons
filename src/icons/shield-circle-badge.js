import { withBadge } from '../shield'
import { ring } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角圆
export default ({ radius }) => withBadge('ring', ring, accent, radius)
