import { withBadgeTop } from '../monitor'
import { plug } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角插头
export default ({ radius, stroke }) => withBadgeTop('plug', plug, accent, radius, stroke)
