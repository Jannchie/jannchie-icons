import { circle, crisp, rounded } from '../geometry'

// 归档：盖子 + 箱体 + 把手
export default ({ radius, stroke }) => [
  // 箱体两侧比盖子各收进 2，接在盖子底边的直线段上，不会被吸到圆角上
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 8.5], [3.5, 8.5]], Math.min(radius, 1.5)),
  rounded([[5.5, 8.5], [5.5, 20.5], [18.5, 20.5], [18.5, 8.5]], Math.min(radius, 2), false),
  'M10 12.5H14',
]
