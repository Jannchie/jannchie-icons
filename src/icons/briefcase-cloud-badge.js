import { withBadge } from '../briefcase'
import { cloud } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)
