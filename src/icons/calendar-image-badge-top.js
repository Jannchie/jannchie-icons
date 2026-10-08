import { withBadgeTop } from '../calendar'
import { image } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角图片
export default ({ radius, stroke }) => withBadgeTop('image', image, accent, radius, stroke)
