import { withBadge } from '../file'
import { image } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角图片
export default ({ radius, stroke }) => withBadge('image', image, accent, radius, stroke)
