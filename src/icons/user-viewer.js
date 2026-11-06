import { withIcon } from '../user'
import eye from './eye'

// 浏览者：人像 + 右下角眼睛
export default opts => withIcon(eye, opts)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = opts => withIcon(eye, opts, undefined, { fill: true })
