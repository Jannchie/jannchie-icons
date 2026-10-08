import { withBadge } from '../file'
import { star } from '../symbols'
import { warning } from '../tone'

// 文件 + 右下角收藏
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)
