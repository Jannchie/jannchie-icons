import { rounded } from '../geometry'

// 衣架：顶上的挂钩 + 扁平的圆角三角衣架身
export default ({ radius }) => [
  'M12 9.5V8A2 2 0 1 1 14 6',
  rounded([[12, 9.5], [21.5, 17], [2.5, 17]], Math.min(radius, 1.5)),
]
