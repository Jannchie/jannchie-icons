import { circle, crisp, rounded } from '../geometry'

// 取消编组：两个方块分开摆放
export default ({ radius, stroke }) => [
  rounded([[3.5, 3.5], [11, 3.5], [11, 11], [3.5, 11]], Math.min(radius, 1.5)),
  rounded([[13, 13], [20.5, 13], [20.5, 20.5], [13, 20.5]], Math.min(radius, 1.5)),
]
