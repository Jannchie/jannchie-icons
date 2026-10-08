import { withBadge } from '../book'
import { video } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角视频
export default ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke)
