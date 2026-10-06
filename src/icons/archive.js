import { circle, crisp, rounded } from '../geometry'

// 归档：盖子 + 箱体 + 把手
export default ({ radius, stroke }) => [
  rounded([[3, 4], [21, 4], [21, 8.5], [3, 8.5]], Math.min(radius, 1.5)),
  rounded([[4.5, 8.5], [4.5, 20], [19.5, 20], [19.5, 8.5]], Math.min(radius, 2), false),
  'M10 12.5H14',
]
