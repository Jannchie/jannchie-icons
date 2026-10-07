import { clock } from '../symbols'
import { info } from '../tone'
import { withSymbol } from '../user'

// 全职（FTE）：人像 + 右下角完整的时钟
export default ({ radius }) => withSymbol('clock', clock, info, radius)
