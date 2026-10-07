import { withBadge } from '../pin'
import { video } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角视频
export default ({ radius }) => withBadge('video', video, accent, radius)
