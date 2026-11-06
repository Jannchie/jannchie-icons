import { shield } from '../symbols'
import { success } from '../tone'
import { withSymbol } from '../user'

// 管理员：人像 + 右下角盾牌
export default ({ radius }) => withSymbol('shield', shield, success, radius)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = ({ radius }) => withSymbol('shield', shield, success, radius, { fill: true })
