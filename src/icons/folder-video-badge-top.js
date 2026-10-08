import { withBadgeTop } from '../folder'
import { video } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角视频
export default ({ radius, stroke }) => withBadgeTop('video', video, accent, radius, stroke)
