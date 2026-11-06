import { symbolFill } from '../list'
import { ban } from '../symbols'

// 禁止
export default ({ radius }) => ban([12, 12], 2.4, radius)

// 实心：圆面填实，斜线挖空、两端各收一个线宽（和列表里的禁止符号同一个画法，见 list.js 的 symbolFill）
export const fill = ({ radius, stroke }) => symbolFill('ban', ban([12, 12], 2.4, radius), stroke)
