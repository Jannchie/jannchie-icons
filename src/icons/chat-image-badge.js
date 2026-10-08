import { withBadge } from '../chat'
import { image } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角图片
export default ({ radius, stroke }) => withBadge('image', image, accent, radius, stroke)
