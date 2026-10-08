import { withBadgeTop } from '../chat'
import { video } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角视频
export default ({ radius, stroke }) => withBadgeTop('video', video, accent, radius, stroke)
