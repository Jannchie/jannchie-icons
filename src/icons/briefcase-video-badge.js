import { withBadge } from '../briefcase'
import { video } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角视频
export default ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke)
