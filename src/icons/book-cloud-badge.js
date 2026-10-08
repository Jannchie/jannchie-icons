import { withBadge } from '../book'
import { cloud } from '../symbols'
import { info } from '../tone'

// 书 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)
