import { rounded } from '../geometry'

// 眼镜（方框）：两个圆角方镜片 + 鼻梁
export default ({ radius }) => [
  rounded([[2.5, 10], [10, 10], [10, 17], [2.5, 17]], Math.min(radius, 2)),
  rounded([[14, 10], [21.5, 10], [21.5, 17], [14, 17]], Math.min(radius, 2)),
  'M10 12.5C11.3 11.5 12.7 11.5 14 12.5',
]
