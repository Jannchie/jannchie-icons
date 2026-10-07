import { withBadge } from '../shield'
import { cloud } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角云
export default ({ radius }) => withBadge('cloud', cloud, info, radius)
