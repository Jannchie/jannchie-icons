import { withBadge } from '../mail'
import { image } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角图片
export default ({ radius, stroke }) => withBadge('image', image, accent, radius, stroke)
