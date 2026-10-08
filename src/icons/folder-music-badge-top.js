import { withBadgeTop } from '../folder'
import { music } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角音乐
export default ({ radius, stroke }) => withBadgeTop('music', music, accent, radius, stroke)
