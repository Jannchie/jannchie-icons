import { withBadge } from '../chat'
import { cloud } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)
