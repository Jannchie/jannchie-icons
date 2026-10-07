import { withBadge } from '../shield'
import { video } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角视频
export default ({ radius }) => withBadge('video', video, accent, radius)
