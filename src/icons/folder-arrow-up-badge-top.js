import { withBadgeTop } from '../folder'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角上箭头
export default ({ radius, stroke }) => withBadgeTop('arrowUp', arrowUp, info, radius, stroke)
