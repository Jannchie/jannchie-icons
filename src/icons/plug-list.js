import { listMark, withListMarkFill } from '../list'
import { solid } from '../solid'
import { plug } from '../symbols'

// 插头为主（居中）+ 右下角小列表；小列表作为 cut，主符号在附近断开
export default ({ radius, stroke }) => [
  ...plug([12, 12], 2, radius),
  ...listMark([18, 18], stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]

// 实心：插头主体填实（电线和插脚照旧是线，同 plug），右下的小列表四周让出缝
export const fill = ({ radius, stroke }) => {
  const [a, b, body] = plug([12, 12], 2, radius)
  return withListMarkFill([a, b, solid(body), body], stroke)
}
