import { listMark } from '../list'
import { video } from '../symbols'

// 视频为主（居中）+ 右下角小列表；小列表作为 cut，主符号在附近断开
export default ({ radius }) => [
  ...video([12, 12], 2, radius),
  ...listMark([18, 18]).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]
