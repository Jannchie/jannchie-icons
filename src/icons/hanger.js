import { rounded } from '../geometry'

// 衣架：顶上的挂钩 + 扁平的圆角三角衣架身
export default ({ radius }) => [
  // 整体右移半格，挂钩竖段落在 12.5 上
  'M12.5 9.5V8A2 2 0 1 1 14.5 6',
  rounded([[12.5, 9.5], [21.5, 17.5], [3.5, 17.5]], Math.min(radius, 1.5)),
]
