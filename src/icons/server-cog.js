import { circle } from '../geometry'
import { affine } from '../transform'
import { accent } from '../tone'
import server from './server'
import settings from './settings'

// 服务器 + 右下角齿轮：齿轮是 settings 缩到 0.45、中心挪到 (18, 17.5)（齿顶半径约 3.9）；
// 一个同大的隐藏圆作为遮挡刀，服务器在齿轮附近断开；齿轮自己也是刀（不被遮挡圆删掉），标成细节
const K = 0.45
const [cx, cy] = [18, 17.5]
const R = 8.6 * K

export default (opts) => [
  ...server(opts),
  { d: circle(cx, cy, R), cut: true, hidden: true, occlude: true },
  ...accent(settings(opts).map(d => ({ d: affine(d, K, K, cx - 12 * K, cy - 12 * K), cut: true, detail: true }))),
]
