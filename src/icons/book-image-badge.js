import { withBadge } from '../book'
import { image } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角图片
export default ({ radius, stroke }) => withBadge('image', image, accent, radius, stroke)
