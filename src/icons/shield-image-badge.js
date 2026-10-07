import { withBadge } from '../shield'
import { image } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角图片
export default ({ radius }) => withBadge('image', image, accent, radius)
