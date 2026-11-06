import { rounded } from '../geometry'
import { glyph, LABEL } from '../letters'
import { knock, solid } from '../solid'

// 数独：方框 + 井字分成九格（格线落在 .5 上，三列宽 5 / 7 / 5）+ 中间一格填好的数字
// 5–6 宽的格子在常规字重下装不下认得出的数字（数字要和格线隔开 0.5），只在最宽的中间格放一个：
// 数字高 3（0.5 倍），离四周格线的中心线都是 2：常规下留 0.7、粗字重下留 0.3 的缝
const S = 0.5
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5)),
  'M8.5 3.5V20.5',
  'M15.5 3.5V20.5',
  'M3.5 8.5H20.5',
  'M3.5 15.5H20.5',
  { d: glyph('5', 12 - 1.75 * S, 12 - 3 * S, S, S, LABEL), thin: true },
]

// 实心：方块一块，格线挖成白线；格线两端各收一个线宽，九格仍连在外框上，不散成九块
export const fill = ({ radius, stroke }) => {
  const [a, b] = [3.5 + stroke, 20.5 - stroke]
  return [
    solid(rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5))),
    knock([`M8.5 ${a}V${b}`, `M15.5 ${a}V${b}`, `M${a} 8.5H${b}`, `M${a} 15.5H${b}`]),
    knock({ d: glyph('5', 12 - 1.75 * S, 12 - 3 * S, S, S, LABEL), thin: true }),
  ]
}
