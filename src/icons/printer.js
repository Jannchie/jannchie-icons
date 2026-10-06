import { circle, crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 打印机：上方进纸 + 机身 + 下方出纸（纸上两行字）
export default ({ radius, stroke }) => [
  rounded([[7, 8], [7, 3], [17, 3], [17, 8]], Math.min(radius, 1), false),
  rounded([[7, 17], [3, 17], [3, 8], [21, 8], [21, 17], [17, 17]], Math.min(radius, 2), false),
  rounded([[7, 13.5], [17, 13.5], [17, 21], [7, 21]], Math.min(radius, 1)),
  'M9.5 16.5H14.5',
  'M9.5 18.75H12.5',
  dot(17.5, 11),
]
