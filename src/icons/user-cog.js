import { circle } from '../geometry'
import { affine } from '../transform'
import { accent } from '../tone'
import settings from './settings'

// 用户设置：和添加用户同一个人形（往左挪）+ 右下角齿轮（settings 缩到 0.45、中心 (18, 16.5)）；
// 一个同大的隐藏圆作为遮挡刀，肩膀在齿轮附近断开（同 server-cog）
const K = 0.45
const [cx, cy] = [18, 16.5]
const R = 8.6 * K

export default opts => [
  circle(9, 8, 3.5),
  'M2.5 20A6.5 6 0 0 1 15.5 20',
  { d: circle(cx, cy, R), cut: true, hidden: true, occlude: true },
  ...accent(settings(opts).map(d => ({ d: affine(d, K, K, cx - 12 * K, cy - 12 * K), cut: true, detail: true }))),
]
