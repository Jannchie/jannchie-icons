import { listMark } from '../list'
import { plug } from '../symbols'

// 插头为主（居中）+ 右下角小列表；小列表作为 cut，主符号在附近断开
export default ({ radius, stroke }) => [
  ...plug([12, 12], 2, radius),
  ...listMark([18, 18], stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]
