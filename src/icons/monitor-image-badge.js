import { withBadge } from '../monitor'
import { image } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角图片
export default ({ radius, stroke }) => withBadge('image', image, accent, radius, stroke)
