import { clock } from '../symbols'
import { info } from '../tone'
import { withSymbol } from '../user'

// 全职（FTE）：人像 + 右下角完整的时钟
export default ({ radius }) => withSymbol('clock', clock, info, radius)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = ({ radius }) => withSymbol('clock', clock, info, radius, { fill: true })
