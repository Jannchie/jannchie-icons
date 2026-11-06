import { withBadge } from '../pin'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke, { fill: true })
