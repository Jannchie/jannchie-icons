import { listMark, withListMarkFill } from '../list'
import { knock, solid } from '../solid'
import { lock } from '../symbols'

// 锁为主（居中）+ 右下角小列表；小列表作为 cut，主符号在附近断开
export default ({ radius, stroke }) => [
  ...lock([12, 12], 2, radius),
  ...listMark([18, 18], stroke).map(p => (typeof p === 'string' ? { d: p, cut: true } : { ...p, cut: true })),
]

// 实心：锁身填实、锁梁是线，右下的小列表四周让出缝。锁孔在中轴上的话离列表让出的缝只剩 0.25 的细条：
// 实心版把锁孔往左挪 2（x 10，锁身露出来的那一截中间）挖空
export const fill = ({ radius, stroke }) => {
  const [body, shackle, keyhole] = lock([12, 12], 2, radius)
  const [x, y0, , y1] = keyhole.match(/-?[\d.]+/g).map(Number)
  return withListMarkFill([solid(body), knock(`M${x - 2} ${y0}V${y1}`), shackle], stroke)
}
