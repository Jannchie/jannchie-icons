import { withBadge } from '../monitor'
import { cloud } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)
