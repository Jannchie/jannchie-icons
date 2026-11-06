import { search } from '../symbols'
import { info } from '../tone'
import { withSymbol } from '../user'

// 查找用户：人像 + 右下角搜索（和 user 系列其它符号角标同一套位置、大小，肩膀在角标附近断开）
export default ({ radius }) => withSymbol('search', search, info, radius)

// 实心：人像填实，角标四周挖出圆形的缝，角标照旧是线
export const fill = ({ radius }) => withSymbol('search', search, info, radius, { fill: true })
