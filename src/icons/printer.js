import { circle, crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 打印机：上方进纸 + 机身 + 下方出纸（纸上两行字）
export default ({ radius, stroke }) => [
  rounded([[7.5, 8.5], [7.5, 3.5], [16.5, 3.5], [16.5, 8.5]], Math.min(radius, 1), false),
  rounded([[7.5, 16.5], [3.5, 16.5], [3.5, 8.5], [20.5, 8.5], [20.5, 16.5], [16.5, 16.5]], Math.min(radius, 2), false),
  rounded([[7.5, 13.5], [16.5, 13.5], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 1)),
  'M9.5 16.5H14.5',
  'M9.5 18.5H12.5',
  dot(17.5, 11),
]
