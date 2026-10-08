import { withBadgeTop } from '../book'
import { video } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角视频
export default ({ radius, stroke }) => withBadgeTop('video', video, accent, radius, stroke)
