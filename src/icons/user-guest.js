import { withIcon } from '../user'
import help from './help'

// 访客：人像 + 右下角圆圈问号（同 help）
export default opts => withIcon(help, opts)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = opts => withIcon(help, opts, undefined, { fill: true })
