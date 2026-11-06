import { withBadge } from '../pin'
import { search } from '../symbols'
import { info } from '../tone'

// 定位针 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('search', search, info, radius, stroke, { fill: true })
