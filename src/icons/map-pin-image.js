import { withBadge } from '../pin'
import { image } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角图片
export default ({ radius }) => withBadge('image', image, accent, radius)
