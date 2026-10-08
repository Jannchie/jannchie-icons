import { withBadge } from '../monitor'
import { ellipsis } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角省略号
export default ({ radius, stroke }) => withBadge('ellipsis', ellipsis, accent, radius, stroke)
