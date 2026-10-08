import { withBadge } from '../file'
import { music } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角音乐
export default ({ radius, stroke }) => withBadge('music', music, accent, radius, stroke)
