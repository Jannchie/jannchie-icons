import { withBadge } from '../mail'
import { heart } from '../symbols'
import { danger } from '../tone'

// 邮件 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke, { fill: true })
