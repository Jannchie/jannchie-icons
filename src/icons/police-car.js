import { carBody, carOutline, carWheels, SEDAN, SEDAN_LINES, sedanWindows, WHEELS } from '../car'
import { rounded } from '../geometry'
import { stacked } from '../solid'

// 警车：和 car 同一辆车（车身、腰线、窗柱、车轮，见 car.js），车顶上一条扁长的警灯条（9.5–15.5 × 4.5–6.5，底边和车顶重合）
// + 警灯条两端各一道往外上方斜出去的闪光（7.5, 4.5 → 6, 3；17.5, 4.5 → 19, 3）
// 和 taxi 区分：taxi 顶上是一块又窄又高的方牌，这里是又宽又扁的灯条，外加两道闪光
const bar = radius => rounded([[9.5, 6.5], [9.5, 4.5], [15.5, 4.5], [15.5, 6.5]], Math.min(radius, 1))
const flashes = 'M7.5 4.5L6 3M17.5 4.5L19 3'

export default ({ radius }) => [...carOutline(SEDAN, radius), ...SEDAN_LINES, bar(radius), flashes, ...WHEELS]

// 实心：车身一块，警灯条单独一块，沿车顶让出 GAP 的缝（同 taxi 的顶灯）；前后两扇车窗挖空；车轮四周让出缝；两道闪光照旧是线
export const fill = ({ radius, stroke }) => [
  ...stacked(bar(radius), carBody(SEDAN, radius)),
  sedanWindows(stroke),
  ...carWheels,
  flashes,
]
