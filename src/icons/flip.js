import { rounded } from '../geometry'

// 翻转：中间竖线 + 两侧对称的直角三角形
export default ({ radius }) => [
  // 中线右移半格到 12.5，两个三角关于它对称（竖边 10.5 / 14.5，底边 18.5）
  'M12.5 3V21',
  rounded([[10.5, 6], [10.5, 18.5], [4, 18.5]], Math.min(radius, 1)),
  rounded([[14.5, 6], [14.5, 18.5], [21, 18.5]], Math.min(radius, 1)),
]
