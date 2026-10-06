import { circle, rounded } from '../geometry'

// USB 标志（三叉戟）：主干 + 顶上三角箭头 + 底部圆 + 左枝圆头 + 右枝方头
export default ({ radius }) => [
  rounded([[12, 2.5], [14.25, 5.5], [9.75, 5.5]], Math.min(radius, 0.75)),
  'M12 5.5V17.25',
  circle(12, 19, 1.75),
  'M12 15L7.5 12V9.5',
  circle(7.5, 8.25, 1.25),
  'M12 13L16.5 10V8.25',
  rounded([[15.25, 5.75], [17.75, 5.75], [17.75, 8.25], [15.25, 8.25]], Math.min(radius, 0.5)),
]
