import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 毛巾（挂在毛巾杆上，正面）：一根横杆（3–21 在 4.5）+ 搭在杆上垂下来的毛巾（6.5–17.5，落到 19.5）；
// 搭过杆的前片短一截，下沿在 16.5，下面露出后片的一截；前片上一道织边（细线，13.5）
// 横杆 + 搭下来的两层 + 织边是毛巾的记号，不像一扇门或一张纸
const rail = 'M3 4.5H21'
const towel = radius => rounded([[6.5, 4.5], [6.5, 19.5], [17.5, 19.5], [17.5, 4.5]], Math.min(radius, 1), false)
const hem = 'M6.5 16.5H17.5'
const band = { d: 'M6.5 13.5H17.5', detail: true }

export default ({ radius }) => [rail, towel(radius), hem, band]

// 实心：毛巾一块；前片下沿整条挖穿，前片和露出的后片分成两块；织边挖空但两头各留一个线宽不切到边（花纹，不是分开的两块）；横杆照旧是线
export const fill = ({ radius, stroke }) => [
  solid(`${towel(radius)}Z`),
  knock([`M${6.5 - stroke} 16.5H${17.5 + stroke}`, { d: `M${6.5 + stroke} 13.5H${17.5 - stroke}`, detail: true }]),
  rail,
]
