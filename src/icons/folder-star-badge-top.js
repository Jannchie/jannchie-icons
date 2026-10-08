import { withBadgeTop } from '../folder'
import { star } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 右上角收藏
export default ({ radius, stroke }) => withBadgeTop('star', star, warning, radius, stroke)
