import { circle, rounded } from '../geometry'

// USB 标志（三叉戟）：主干 + 顶上三角箭头 + 底部圆 + 左枝圆头 + 右枝方头；主干和两枝的竖线落在 .5 上，整体偏左半格
export default ({ radius }) => [
  rounded([[11.5, 2.5], [13.75, 5.5], [9.25, 5.5]], Math.min(radius, 0.75)),
  'M11.5 5.5V17.25',
  circle(11.5, 19, 1.75),
  'M11.5 15L7.5 12V9.5',
  circle(7.5, 8.25, 1.25),
  'M11.5 13L15.5 10V8.5',
  rounded([[14.5, 6.5], [16.5, 6.5], [16.5, 8.5], [14.5, 8.5]], Math.min(radius, 0.5)),
]
