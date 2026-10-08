import { withBadge } from '../monitor'
import { plug } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角插头
export default ({ radius, stroke }) => withBadge('plug', plug, accent, radius, stroke)
