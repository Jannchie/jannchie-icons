import { withBadgeTop } from '../monitor'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角左箭头
export default ({ radius, stroke }) => withBadgeTop('arrowLeft', arrowLeft, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('arrowLeft', arrowLeft, info, radius, stroke, { fill: true })
