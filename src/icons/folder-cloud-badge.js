import { withBadge } from '../folder'
import { cloud } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)
