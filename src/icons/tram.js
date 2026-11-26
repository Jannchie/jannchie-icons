import { chassis, wheelCircles, wheelFill, windowRow } from '../car'
import { rounded } from '../geometry'
import { solid } from '../solid'

// 有轨电车（侧视）：顶上一根贯通的架空线（3.5），车顶中间一个三角形的受电弓（10–14 落在车顶 8.5，尖顶顶着架空线）；
// 车厢 2.5–21.5 × 8.5–17.5，一道腰线（13.5）隔出一排四扇车窗（窗柱 7.5、12、16.5）；车底两个小轮（半径 1.5，圆心 (7, 18) / (17, 18)）嵌在车厢里，底边在车轮处断开、线头落在车轮的圆上（同 car，见 car.js）
// 受电弓 + 架空线是记号：和 bus（大轮子、没有受电弓）、train（侧视流线车头 + 铁轨）、subway（正视 + 隧道）分开
const wire = 'M2.5 3.5H21.5'
const pantograph = 'M10 8.5L12 3.5L14 8.5'
const WHEELS = [[7, 18, 1.5], [17, 18, 1.5]]
const SHELL = [[2.5, 8.5], [21.5, 8.5]]

export default ({ radius }) => [
  wire,
  pantograph,
  ...chassis(SHELL, radius, { y: 17.5, wheels: WHEELS, cap: 2 }),
  'M2.5 13.5H21.5',
  'M7.5 8.5V13.5M12 8.5V13.5M16.5 8.5V13.5',
  ...wheelCircles(WHEELS),
]

// 实心：车厢一块，四扇车窗挖空（窗洞和描边版窗框的内缘一样大，见 car.js 的 windowRow）；
// 车轮四周让出缝，车轮是实心圆；架空线、受电弓照旧是线
export const fill = ({ radius, stroke }) => [
  wire,
  pantograph,
  solid(rounded([[2.5, 8.5], [21.5, 8.5], [21.5, 17.5], [2.5, 17.5]], Math.min(radius, 2))),
  ...windowRow([2.5, 7.5, 12, 16.5, 21.5], 8.5, 13.5, Math.max(0, Math.min(radius, 2) - stroke) / 2, stroke),
  ...wheelFill(WHEELS),
]
