import { crisp, rounded } from '../geometry'

// 缩放 / 分辨率：外框 + 左下角小框 + 指向右上的 45° 箭头
export default ({ radius }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5)),
  rounded([[3, 13], [11, 13], [11, 21]], Math.min(radius, 1), false),
  'M14 10L18 6',
  rounded([[15, 6], [18, 6], [18, 9]], crisp(radius), false),
]
