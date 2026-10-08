import { withBadge } from '../calendar'
import { video } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角视频
export default ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke)
