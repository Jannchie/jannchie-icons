import { carBody, carOutline, carWheels, SEDAN, SEDAN_LINES, sedanWindows, WHEELS } from '../car'
import { rounded } from '../geometry'
import { stacked } from '../solid'

// 出租车：和 car 同一辆车（车身、腰线、窗柱、车轮，见 car.js），车顶中间多一块顶灯（10.5–14.5 × 3.5–6.5）
// 顶灯画成闭合的方块，底边和车顶重合：画成开口的折线时，两端的方头会从车顶下面冒出来
const sign = radius => rounded([[10.5, 6.5], [10.5, 3.5], [14.5, 3.5], [14.5, 6.5]], Math.min(radius, 1))

export default ({ radius }) => [...carOutline(SEDAN, radius), ...SEDAN_LINES, sign(radius), ...WHEELS]

// 实心：车身一块，顶灯单独一块，沿车顶让出 GAP 的缝（不和车顶粘成一个鼓包，见 solid.js 的 stacked）；
// 前后两扇车窗挖空（同 car）；车轮四周让出缝，车轮是实心圆
export const fill = ({ radius, stroke }) => [
  ...stacked(sign(radius), carBody(SEDAN, radius)),
  sedanWindows(stroke),
  ...carWheels,
]
