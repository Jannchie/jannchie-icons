import { withBadgeTop } from '../book'
import { cloud } from '../symbols'
import { info } from '../tone'

// 书 + 右上角云
export default ({ radius, stroke }) => withBadgeTop('cloud', cloud, info, radius, stroke)
