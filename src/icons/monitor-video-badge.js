import { withBadge } from '../monitor'
import { video } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角视频
export default ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke)
