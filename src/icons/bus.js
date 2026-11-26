import { chassis, wheelCircles, wheelFill, windowRow } from '../car'
import { rounded } from '../geometry'
import { solid } from '../solid'

// 公交车（侧视、车头朝右）：方正的长车厢 2.5–21.5 × 4.5–17.5；一道腰线（10.5）把上面隔成一排车窗，
// 三根窗柱（7.5、12.5、17.5）上下都垂直接在车顶和腰线上；两个车轮（半径 2.25，圆心 (7, 18.25) / (17, 18.25)）嵌在车厢里：底边在车轮处断开，线头落在车轮的圆上（同 car，见 car.js）
const WHEELS = [[7, 18.25, 2.25], [17, 18.25, 2.25]]
const SHELL = [[2.5, 4.5], [21.5, 4.5]]

export default ({ radius }) => [
  ...chassis(SHELL, radius, { y: 17.5, wheels: WHEELS, cap: 2 }),
  'M2.5 10.5H21.5',
  'M7.5 4.5V10.5M12.5 4.5V10.5M17.5 4.5V10.5',
  ...wheelCircles(WHEELS),
]

// 实心：车厢一块，四扇车窗挖空（窗洞和描边版窗框的内缘一样大，窗柱、车顶留一个线宽；最右一扇只有 4 宽，见 car.js 的 windowRow）；
// 车轮四周让出缝，车轮是实心圆
export const fill = ({ radius, stroke }) => [
  solid(rounded([[2.5, 4.5], [21.5, 4.5], [21.5, 17.5], [2.5, 17.5]], Math.min(radius, 2))),
  ...windowRow([2.5, 7.5, 12.5, 17.5, 21.5], 4.5, 10.5, Math.max(0, Math.min(radius, 2) - stroke) / 2, stroke),
  ...wheelFill(WHEELS),
]
