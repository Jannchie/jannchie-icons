import { withBadgeTop } from '../chat'
import { cloud } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角云
export default ({ radius, stroke }) => withBadgeTop('cloud', cloud, info, radius, stroke)
