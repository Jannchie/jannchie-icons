import { withBadgeTop } from '../folder'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角左箭头
export default ({ radius, stroke }) => withBadgeTop('arrowLeft', arrowLeft, info, radius, stroke)
