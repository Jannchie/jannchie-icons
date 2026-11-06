import { symbolFill } from '../list'
import { clock } from '../symbols'

// 时钟
export default ({ radius }) => clock([12, 12], 2.3, radius)

// 实心：表盘填实，指针挖空（见 list.js 的 symbolFill）
export const fill = ({ radius, stroke }) => symbolFill('clock', clock([12, 12], 2.3, radius), stroke)
