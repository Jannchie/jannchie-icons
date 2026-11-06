import { withBadgeTop } from '../monitor'
import { ellipsis } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角省略号
export default ({ radius, stroke }) => withBadgeTop('ellipsis', ellipsis, accent, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('ellipsis', ellipsis, accent, radius, stroke, { fill: true })
