import { listMark, symbolFill, withListMarkFill } from '../list'
import { clock } from '../symbols'

// 时钟为主（居中）+ 右下角小列表；小列表作为 cut，主符号在附近断开
export default ({ radius, stroke }) => [
  ...clock([12, 12], 2, radius),
  ...listMark([18, 18], stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]

// 实心：主符号填实，右下的小列表四周让出缝
export const fill = ({ radius, stroke }) => withListMarkFill(symbolFill('clock', clock([12, 12], 2, radius), stroke), stroke)
