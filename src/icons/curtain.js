import { GAP } from '../clearance'
import { solid } from '../solid'

// 窗帘：顶上一根横杆（2.5–21.5 在 3.5）；左右两幅帘子从横杆垂下，外侧是直边（4.5 / 19.5），
// 内侧在半腰被束起往外收、到下摆再放开，落在 20.5；两幅帘子中间留出 3 的缝
const panel = (s, top = 3.5) => {
  const x = v => 12 + s * (v - 12)
  return `M${x(4.5)} ${top}H${x(10.5)}C${x(10.5)} 8 ${x(9)} 11 ${x(7.5)} 12.5C${x(9)} 14 ${x(10)} 17 ${x(10)} 20.5H${x(4.5)}Z`
}
export default () => [
  'M2.5 3.5H21.5',
  panel(1),
  panel(-1),
]

// 实心：两幅帘子各一块，顶边从横杆往下让出 GAP 的缝（墨迹上缘在横杆墨迹下缘再往下 GAP），四个角照样收圆，不和横杆粘成一个 T 字；
// 横杆照旧是线
export const fill = ({ stroke }) => {
  const top = 3.5 + stroke + GAP
  return [
    solid([panel(1, top), panel(-1, top)]),
    'M2.5 3.5H21.5',
  ]
}
