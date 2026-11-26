import { windowRow } from '../car'
import { rounded } from '../geometry'
import { solid } from '../solid'

// 缆车：一根斜的缆绳（从左上 (3, 6) 到右上 (21, 3)）+ 挂在缆绳正中的吊臂（竖线，12）+ 吊臂下面的车厢（5.5–18.5 × 8.5–19.5）；
// 车厢上半一排三扇车窗：一道腰线（13.5）+ 两根窗柱（9.5 / 14.5）
const cable = 'M3 6L21 3'
const arm = 'M12 4.5V8.5'
const cabin = radius => rounded([[5.5, 8.5], [18.5, 8.5], [18.5, 19.5], [5.5, 19.5]], Math.min(radius, 2.5))
const belt = 'M5.5 13.5H18.5'
const posts = 'M9.5 8.5V13.5M14.5 8.5V13.5'

export default ({ radius }) => [cable, arm, cabin(radius), belt, posts]

// 实心：车厢一块，三扇车窗挖成洞（和描边版窗框的内缘一样大）；缆绳、吊臂照旧是线
// 两边的车窗只有 4 宽，粗字重下留 0.1 的余量（见 car.js 的 windowRow）
export const fill = ({ radius, stroke }) => [
  cable,
  arm,
  solid(cabin(radius)),
  ...windowRow([5.5, 9.5, 14.5, 18.5], 8.5, 13.5, Math.max(0, Math.min(radius, 2.5) - stroke) / 2, stroke),
]
