import { rounded } from '../geometry'
import { solid } from '../solid'

// 横幅：一条横向的闭合旗带（8.5–15.5），两端各向里切出燕尾缺口（缺口深 2.5）
export default ({ radius }) => [
  rounded([[2.5, 8.5], [21.5, 8.5], [19, 12], [21.5, 15.5], [2.5, 15.5], [5, 12]], Math.min(radius, 1)),
]

// 实心：整条旗带一块
export const fill = ({ radius }) => [
  solid(rounded([[2.5, 8.5], [21.5, 8.5], [19, 12], [21.5, 15.5], [2.5, 15.5], [5, 12]], Math.min(radius, 1))),
]
