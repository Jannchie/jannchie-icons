import { withBadge } from '../chat'
import { video } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角视频
export default ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke)
