import { withBadge } from '../book'
import { ring } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角圆
export default ({ radius, stroke }) => withBadge('ring', ring, accent, radius, stroke)
