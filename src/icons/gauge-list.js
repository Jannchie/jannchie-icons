import { listMark, withListMarkFill } from '../list'
import { knock, solid } from '../solid'
import { gauge } from '../symbols'

// 计速器为主（居中）+ 右下角小列表；小列表作为 cut，主符号在附近断开
export default ({ radius, stroke }) => [
  ...gauge([12, 12], 2, radius),
  ...listMark([18, 18], stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]

// 实心：表盘弧拉一道弦封口成一块、指针挖空（同 gauge），右下的小列表四周让出缝
export const fill = ({ radius, stroke }) => {
  const [arc, needle] = gauge([12, 12], 2, radius)
  return withListMarkFill([solid(`${arc}Z`), knock(needle)], stroke)
}
