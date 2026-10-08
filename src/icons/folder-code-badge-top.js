import { withBadgeTop } from '../folder'
import { code } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角代码
export default ({ radius, stroke }) => withBadgeTop('code', code, accent, radius, stroke)
