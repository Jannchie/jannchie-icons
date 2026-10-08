import { withBadgeTop } from '../monitor'
import { cloud } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角云
export default ({ radius, stroke }) => withBadgeTop('cloud', cloud, info, radius, stroke)
