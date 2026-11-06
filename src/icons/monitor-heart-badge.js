import { withBadge } from '../monitor'
import { heart } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke, { fill: true })
