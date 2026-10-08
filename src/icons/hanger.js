import { rounded } from '../geometry'

// 衣架：顶上的挂钩 + 扁平的圆角三角衣架身
export default ({ radius }) => [
  // 挂钩竖段在中线 12 上
  'M12 9.5V8A2 2 0 1 1 14 6',
  rounded([[12, 9.5], [21, 17.5], [3, 17.5]], Math.min(radius, 1.5)),
]
