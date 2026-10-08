import { withBadgeTop } from '../book'
import { image } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角图片
export default ({ radius, stroke }) => withBadgeTop('image', image, accent, radius, stroke)
