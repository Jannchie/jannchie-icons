import { withBadgeTop } from '../monitor'
import { video } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角视频
export default ({ radius, stroke }) => withBadgeTop('video', video, accent, radius, stroke)
