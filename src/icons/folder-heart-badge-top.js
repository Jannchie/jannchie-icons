import { withBadgeTop } from '../folder'
import { heart } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右上角爱心
export default ({ radius, stroke }) => withBadgeTop('heart', heart, danger, radius, stroke)
