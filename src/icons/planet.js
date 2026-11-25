import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, solid } from '../solid'
import { rotate } from '../transform'

// 行星（带环）：圆的星球（半径 6）+ 一道斜着的星环（椭圆，半径 10 × 3.25，往左上歪 20°）：星环绕到星球背后的那一段不画，
// 正面的一段从星球前面横过去，两端接在星球的圆上
const [R, rx, ry] = [6, 10, 3.25]
const f = v => +v.toFixed(3)
// 星环和星球的圆的交点（转之前，相对圆心）：x = ±ix，y = ±iy；背后那段是上面两个交点之间的弧
const ix = Math.sqrt((R * R / (ry * ry) - 1) / (1 / (ry * ry) - 1 / (rx * rx)))
const iy = Math.sqrt(R * R - ix * ix)
const ring = rotate(`M${f(12 + ix)} ${f(12 - iy)}A${rx} ${ry} 0 1 1 ${f(12 - ix)} ${f(12 - iy)}`, -20)
const ball = circle(12, 12, R)

export default () => [ball, ring]

// 实心：星球填实，星环在星球前面的那一段两侧各让出缝，星环照旧是线
export const fill = () => [solid(ball), clear(ring, GAP), ring]
