import { withBadge } from '../calendar'
import { image } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角图片
export default ({ radius, stroke }) => withBadge('image', image, accent, radius, stroke)
