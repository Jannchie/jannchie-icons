import { circle } from '../geometry'
import { dot } from '../scene'

// 触摸涟漪（轻触的反馈）：正中一个实心的触点，外面一整圈涟漪，再外面一圈已经散开、只剩上下两段弧——像触摸屏的点按反馈
// 不画手指：一根手指在这个尺寸下读不出来，触点 + 涟漪本身就是「点了一下」
// 和 target（三个完整的同心圆）的区别：中心是实心点，外圈是断开的
// 外圈墨迹的外缘固定在 2 / 22，线宽变粗往里长；上下两段各张开 ±SPREAD 度
const [cx, cy] = [12, 12]
const SPREAD = 50
const arc = (r, mid) => {
  const p = (deg) => {
    const a = deg * Math.PI / 180
    return `${+(cx + r * Math.cos(a)).toFixed(3)} ${+(cy + r * Math.sin(a)).toFixed(3)}`
  }
  return `M${p(mid - SPREAD)}A${r} ${r} 0 0 1 ${p(mid + SPREAD)}`
}

export default ({ stroke }) => {
  const r = 10 - stroke / 2
  return [dot(cx, cy, 3.5), circle(cx, cy, 5), arc(r, -90), arc(r, 90)]
}
