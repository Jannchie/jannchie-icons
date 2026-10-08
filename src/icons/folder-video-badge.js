import { withBadge } from '../folder'
import { video } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角视频
export default ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke)
