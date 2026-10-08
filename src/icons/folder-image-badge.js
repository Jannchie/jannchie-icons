import { withBadge } from '../folder'
import { image } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角图片
export default ({ radius, stroke }) => withBadge('image', image, accent, radius, stroke)
