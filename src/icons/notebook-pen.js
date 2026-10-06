import { circle, crisp, rounded } from '../geometry'

// 笔记本 + 笔：本子（左侧装订环、两行字）+ 右侧竖放的笔
export default ({ radius, stroke }) => [
  rounded([[4.5, 3], [15, 3], [15, 21], [4.5, 21]], Math.min(radius, 1.5)),
  'M3 7.5H6',
  'M3 12H6',
  'M3 16.5H6',
  'M8 8H12',
  'M8 11.5H12',
  rounded([[18.25, 3], [20.75, 3], [20.75, 16.5], [19.5, 19.5, crisp(radius)], [18.25, 16.5]], Math.min(radius, 1)),
]
