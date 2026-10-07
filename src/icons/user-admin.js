import { shield } from '../symbols'
import { success } from '../tone'
import { withSymbol } from '../user'

// 管理员：人像 + 右下角盾牌
export default ({ radius }) => withSymbol('shield', shield, success, radius)
