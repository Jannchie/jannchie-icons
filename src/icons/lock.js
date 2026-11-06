import { symbolFill } from '../list'
import { lock } from '../symbols'

// 锁
export default ({ radius }) => lock([12, 12], 2.3, radius)

// 实心：锁身填实，锁孔挖空，锁梁照旧是线（见 list.js 的 symbolFill）
export const fill = ({ radius, stroke }) => symbolFill('lock', lock([12, 12], 2.3, radius), stroke)
