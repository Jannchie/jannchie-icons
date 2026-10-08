import { withBadge } from '../mail'
import { video } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角视频
export default ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke)
