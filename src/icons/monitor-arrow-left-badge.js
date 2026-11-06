import { withBadge } from '../monitor'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke, { fill: true })
