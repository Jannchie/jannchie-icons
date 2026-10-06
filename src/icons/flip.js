import { rounded } from '../geometry'

// 翻转：中间竖线 + 两侧对称的直角三角形
export default ({ radius }) => [
  'M12 3V21',
  rounded([[9.5, 6], [9.5, 18], [3, 18]], Math.min(radius, 1)),
  rounded([[14.5, 6], [14.5, 18], [21, 18]], Math.min(radius, 1)),
]
