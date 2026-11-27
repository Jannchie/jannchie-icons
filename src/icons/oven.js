import { rounded } from '../geometry'
import { dot } from '../scene'
import { hole, knock, solid } from '../solid'

// 烤箱（嵌入式烤箱，正面）：竖长的机身（3.5–20.5 × 2.5–21.5，和 washing-machine 同一个机身）+ 顶部操作面板的分隔线（8.5）
// + 面板上左边一道显示屏（短横线）、右边两个旋钮 + 烤箱门上一根横贯的门把手（11.5）+ 把手下面的玻璃窗（6.5–17.5 × 14.5–18.5）
// 上下每隔 3 一道：面板线、把手、窗顶、窗底、机身底。靠「门把手 + 玻璃窗」认出来：
// stove 是方的、面板上三个旋钮、没有门把手；washing-machine 是圆的滚筒门；microwave 是横的、面板在右侧
const body = radius => rounded([[3.5, 2.5], [20.5, 2.5], [20.5, 21.5], [3.5, 21.5]], Math.min(radius, 2))
const window = (radius, k = 0) => rounded([[6.5 + k, 14.5 + k], [17.5 - k, 14.5 + k], [17.5 - k, 18.5 - k], [6.5 + k, 18.5 - k]], Math.max(0, Math.min(radius, 1) - k))
const display = 'M6.5 5.5H10.5'
const knobs = [dot(14.5, 5.5, 1.5), dot(17.5, 5.5, 1.5)]
const handle = 'M6.5 11.5H17.5'

export default ({ radius }) => [body(radius), 'M3.5 8.5H20.5', display, ...knobs, handle, window(radius)]

// 实心：机身一块；面板分隔线整条挖穿，操作面板和烤箱门分成两块；显示屏、旋钮、门把手挖空，玻璃窗挖成洞（和描边版窗框的内缘一样大）
export const fill = ({ radius, stroke }) => [
  solid(body(radius)),
  knock([`M${3.5 - stroke} 8.5H${20.5 + stroke}`, display, ...knobs, handle]),
  hole(window(radius, stroke / 2)),
]
