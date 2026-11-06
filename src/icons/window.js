import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 窗口：外框 + 标题栏分隔线 + 三个小圆点
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)),
  'M3.5 8.5H20.5',
  ...[6, 8.5, 11].map(x => dot(x, 6.5, 1.5)),
]

// 实心：外框填实，标题栏分隔线挖开，标题栏里的三个小圆点挖空；
// 挖开分隔线后标题栏的实心部分是 4.5 - h 到 8.5 - h，圆点跟着上移 h 放在它正中，粗字重下才不和分隔缝连上
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5))),
  knock(['M3.5 8.5H20.5', ...[6, 8.5, 11].map(x => dot(x, 6.5 - stroke / 2, 1.5))]),
]
