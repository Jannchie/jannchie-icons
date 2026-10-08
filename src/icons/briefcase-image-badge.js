import { withBadge } from '../briefcase'
import { image } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角图片
export default ({ radius, stroke }) => withBadge('image', image, accent, radius, stroke)
