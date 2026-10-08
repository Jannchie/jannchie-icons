import { withBadge } from '../folder'
import { star } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 右下角收藏
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)
