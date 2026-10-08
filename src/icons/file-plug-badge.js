import { withBadge } from '../file'
import { plug } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角插头
export default ({ radius, stroke }) => withBadge('plug', plug, accent, radius, stroke)
