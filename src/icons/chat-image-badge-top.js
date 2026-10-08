import { withBadgeTop } from '../chat'
import { image } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角图片
export default ({ radius, stroke }) => withBadgeTop('image', image, accent, radius, stroke)
