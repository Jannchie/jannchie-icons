import { withBadgeTop } from '../calendar'
import { video } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角视频
export default ({ radius, stroke }) => withBadgeTop('video', video, accent, radius, stroke)
