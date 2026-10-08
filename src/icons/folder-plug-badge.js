import { withBadge } from '../folder'
import { plug } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角插头
export default ({ radius, stroke }) => withBadge('plug', plug, accent, radius, stroke)
