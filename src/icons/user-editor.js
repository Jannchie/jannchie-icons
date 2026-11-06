import { withIcon } from '../user'
import edit from './edit'

// 编辑者：人像 + 右下角铅笔（同 edit）
export default opts => withIcon(edit, opts)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = opts => withIcon(edit, opts, undefined, { fill: true })
