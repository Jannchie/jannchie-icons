import { GAP } from './clearance'
import { circle, rounded } from './geometry'
import { clear, hole, solid } from './solid'
import { shrink } from './tag'

// 车辆（car / taxi / police-car / van / bus / tram）共用的底盘：侧视、车头朝右，车尾 2.5、车头 21.5
// 两个车轮压在车身的底边上：底边在车轮处断开，线头正好落在车轮的圆上——车轮嵌在车身里。
// 挂在闭合车身的底边下面、只和底边相切的车轮像是悬在车底，衔接不上

// 车轮 [圆心 x, 圆心 y, 半径] → 描边版的圆、实心版的「让缝 + 实心圆」
export const wheelCircles = ws => ws.map(([x, y, r]) => circle(x, y, r))
export const wheelFill = ws => [clear(wheelCircles(ws), GAP), solid(wheelCircles(ws))]

// 描边版的车身：shell 是车身除底边以外的折点（车尾 → 车顶 → 车头），底边在 y；底边分三段（车尾到后轮、两轮之间、前轮到车头），
// 断点是车轮的圆和底边的交点（取两位小数）；cap 是车身圆角的上限
export function chassis(shell, radius, { y, wheels, cap }) {
  const [a, b, c, d] = wheels.flatMap(([cx, cy, r]) => {
    const o = Math.sqrt(r * r - (cy - y) ** 2)
    return [+(cx - o).toFixed(2), +(cx + o).toFixed(2)]
  })
  return [rounded([[a, y], [2.5, y], ...shell, [21.5, y], [d, y]], Math.min(radius, cap), false), `M${b} ${y}H${c}`]
}

// 一排车窗挖成洞：窗柱在 xs、上下沿在 y0 / y1（都是中心线），洞和描边版窗框的内缘一样大；
// 窄的车窗粗字重下内缩一个线宽会缩没，留 0.1 的余量；r 是洞的圆角（bus、tram、cable-car）
export const windowRow = (xs, y0, y1, r, stroke) => xs.slice(1).map((x, i) => {
  const k = Math.min(stroke, (x - xs[i]) / 2 - 0.1)
  return hole(rounded([[xs[i] + k, y0 + k], [x - k, y0 + k], [x - k, y1 - k], [xs[i] + k, y1 - k]], r))
})

// ---------- 小车（car / taxi / police-car / van）：底边 15.5，车轮半径 2.25、圆心 (7, 16.25) / (17, 16.25) ----------
const BOTTOM = 15.5
const CAR_WHEELS = [[7, 16.25, 2.25], [17, 16.25, 2.25]]
export const WHEELS = wheelCircles(CAR_WHEELS)
export const carOutline = (shell, radius) => chassis(shell, radius, { y: BOTTOM, wheels: CAR_WHEELS, cap: 1.5 })
// 实心版的车身轮廓：闭合的一整块
export const carBody = (shell, radius) => rounded([[2.5, BOTTOM], ...shell, [21.5, BOTTOM]], Math.min(radius, 1.5))
// 实心版的车轮：车身在车轮四周让出缝，车轮是实心圆（接在车身和车窗后面）
export const carWheels = wheelFill(CAR_WHEELS)

// 轿车（car / taxi / police-car）：腰线 10.5，车顶 6.5（8.5–15），前后挡风斜下到腰线；
// 腰线横贯车窗下沿，中间一根竖柱把车窗分成前后两扇
export const SEDAN = [[2.5, 10.5], [6, 10.5], [8.5, 6.5], [15, 6.5], [18, 10.5], [21.5, 10.5]]
export const SEDAN_LINES = ['M6 10.5H18', 'M12.5 6.5V10.5']
// 实心版的两扇窗洞：车窗中心线往里收一个线宽再外扩半个线宽，和描边版窗框的内缘一样大；粗字重下 4 高的车窗收不了一个线宽，最多收 1.6
export function sedanWindows(stroke) {
  const k = Math.min(stroke, 1.6)
  return hole([
    rounded(shrink([[6, 10.5], [8.5, 6.5], [12.5, 6.5], [12.5, 10.5]], k), 0),
    rounded(shrink([[12.5, 6.5], [15, 6.5], [18, 10.5], [12.5, 10.5]], k), 0),
  ])
}
