import { withIcon } from '../user'
import laptop from './laptop'

// 自由职业：人像 + 右下角笔记本电脑
export default opts => withIcon(laptop, opts)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = opts => withIcon(laptop, opts, undefined, { fill: true })
