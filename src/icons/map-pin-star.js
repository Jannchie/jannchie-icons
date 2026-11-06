import { withBadge } from '../pin'
import { star } from '../symbols'
import { warning } from '../tone'

// 定位针 + 右下角星标
export default ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('star', star, warning, radius, stroke, { fill: true })
