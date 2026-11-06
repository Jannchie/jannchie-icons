import { symbolFill } from '../list'
import { puzzle } from '../symbols'

// 拼图（模组）
export default ({ radius }) => puzzle([12, 12], 2.3, radius)

// 实心：整块拼图
export const fill = ({ radius, stroke }) => symbolFill('puzzle', puzzle([12, 12], 2.3, radius), stroke)
