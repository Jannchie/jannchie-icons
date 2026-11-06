import { withBadgeTop } from '../folder'
import { cloud } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角云
export default ({ radius, stroke }) => withBadgeTop('cloud', cloud, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('cloud', cloud, info, radius, stroke, { fill: true })
