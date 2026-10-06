import { circle, crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 多个标签：前面一个完整的标签 + 后面一个只露出右上边缘
export default ({ radius, stroke }) => [
  rounded([[3, 7.5], [10, 7.5], [17, 14.5], [10, 21.5], [3, 14.5]], Math.min(radius, 1.5)),
  dot(6.5, 11),
  'M7.5 3.5H14L21 10.5',
]
