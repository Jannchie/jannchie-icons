import { withIcon } from '../user'
import cap from './graduation-cap'

// 实习生：人像 + 右下角学士帽
export default opts => withIcon(cap, opts)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = opts => withIcon(cap, opts, undefined, { fill: true })
