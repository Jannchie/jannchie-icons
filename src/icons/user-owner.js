import { warning } from '../tone'
import { withIcon } from '../user'
import crown from './crown'

// 所有者：人像 + 右下角皇冠
export default opts => withIcon(crown, opts, warning)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = opts => withIcon(crown, opts, warning, { fill: true })
