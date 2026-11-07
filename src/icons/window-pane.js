import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 窗户（建筑立面，和界面里的 window 区分）：窗框（4.5–18.5 × 3.5–19.5）+ 十字窗棂（x 11.5 / y 11.5）分成四格；
// 底下一条窗台，两头各伸出窗框 2（2.5–20.5 在 19.5）
export default ({ radius }) => [
  rounded([[4.5, 3.5], [18.5, 3.5], [18.5, 19.5], [4.5, 19.5]], Math.min(radius, 1)),
  'M11.5 3.5V19.5',
  'M4.5 11.5H18.5',
  'M2.5 19.5H20.5',
]

// 实心：四块玻璃各画一块独立的圆角块（见 solid.js 的 tile），块和块之间留 GAP 的缝；
// 玻璃只有 7 见方，圆角最多 0.5（和窗框一样用 1 会圆成一团）；窗台照旧是线
export const fill = ({ radius, stroke }) => {
  const cols = spans(4.5, 18.5, [11.5], stroke)
  return [
    ...spans(3.5, 19.5, [11.5], stroke).flatMap(([y0, y1]) => cols.map(([x0, x1]) => tile([x0, y0, x1, y1], Math.min(radius, 0.5)))),
    'M2.5 19.5H20.5',
  ]
}
