import { rounded } from '../geometry'
import { dot } from '../scene'

// 节拍器：梯形机身 + 底座 + 斜摆的摆杆 + 摆杆上的砝码
// 机身拆成两块：底座是闭合的小梯形（16.5–20.5），上面的机身是开放折线，两端顺着斜边落在底座的两个上角上——
// 斜边上没有斜着接进来的线头（以前的底座横线两端斜接在斜边上，加粗、尖角时线头会从斜边外侧冒出来）
const side = y => 8.5 - (y - 3.5) * 3.5 / 17 // 左斜边在高度 y 处的 x；右边按 x = 12 对称
const BASE = 16.5
export default ({ radius }) => [
  rounded([[side(BASE), BASE], [24 - side(BASE), BASE], [19, 20.5], [5, 20.5]], Math.min(radius, 1.5)),
  rounded([[side(BASE), BASE], [8.5, 3.5], [15.5, 3.5], [24 - side(BASE), BASE]], Math.min(radius, 1.5), false),
  'M12 16.5L16 6',
  dot(14.4, 10.4, 3),
]
