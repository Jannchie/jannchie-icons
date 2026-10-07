import { rounded } from '../geometry'

// 横幅：一条横向的闭合旗带（7.5–14.5），两端各向里切出燕尾缺口（缺口深 2.5）
export default ({ radius }) => [
  rounded([[2.5, 7.5], [21.5, 7.5], [19, 11], [21.5, 14.5], [2.5, 14.5], [5, 11]], Math.min(radius, 1)),
]
