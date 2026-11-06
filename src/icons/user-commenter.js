import { withIcon } from '../user'
import chat from './chat'

// 评论者：人像 + 右下角对话气泡
export default opts => withIcon(chat, opts)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = opts => withIcon(chat, opts, undefined, { fill: true })
