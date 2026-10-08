import { withBadgeTop } from '../monitor'
import { image } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角图片
export default ({ radius, stroke }) => withBadgeTop('image', image, accent, radius, stroke)
