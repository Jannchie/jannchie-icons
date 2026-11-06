import { circle, crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 笔记本 + 笔：本子（左侧装订环、两行字）+ 右侧竖放的笔
export default ({ radius, stroke }) => [
  rounded([[4.5, 3.5], [15.5, 3.5], [15.5, 20.5], [4.5, 20.5]], Math.min(radius, 1.5)),
  'M3 7.5H6',
  'M3 11.5H6',
  'M3 15.5H6',
  'M8 8.5H12',
  'M8 11.5H12',
  rounded([[18.5, 3.5], [20.5, 3.5], [20.5, 16.5], [19.5, 19.5, crisp(radius)], [18.5, 16.5]], Math.min(radius, 1)),
]

// 实心：本子、笔各一块，两行字挖空；装订环照旧是线，最后画（伸出左边的一截像书脊上的环）
export const fill = ({ radius }) => [
  solid([
    rounded([[4.5, 3.5], [15.5, 3.5], [15.5, 20.5], [4.5, 20.5]], Math.min(radius, 1.5)),
    rounded([[18.5, 3.5], [20.5, 3.5], [20.5, 16.5], [19.5, 19.5, crisp(radius)], [18.5, 16.5]], Math.min(radius, 1)),
  ]),
  knock(['M8 8.5H12', 'M8 11.5H12']),
  'M3 7.5H6',
  'M3 11.5H6',
  'M3 15.5H6',
]
