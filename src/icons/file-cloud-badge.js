import { withBadge } from '../file'
import { cloud } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)
