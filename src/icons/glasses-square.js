import { rounded } from '../geometry'

// 眼镜（方框）：两个圆角方镜片 + 鼻梁
export default ({ radius }) => [
  rounded([[2.5, 9.5], [9.5, 9.5], [9.5, 16.5], [2.5, 16.5]], Math.min(radius, 2)),
  rounded([[14.5, 9.5], [21.5, 9.5], [21.5, 16.5], [14.5, 16.5]], Math.min(radius, 2)),
  'M9.5 12C11 11 13 11 14.5 12',
]
