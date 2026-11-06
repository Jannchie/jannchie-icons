import { circle } from '../geometry'
import { pin } from '../pin'
import { hole, solid } from '../solid'

// 位置：水滴形定位针 + 中心圆
export default ({ stroke }) => pin(stroke)

// 实心：针身一块，中心挖一个圆洞（洞外扩半个线宽后半径 2.5，和描边版中心圆的中心线一样大）
export const fill = ({ stroke }) => {
  const [drop] = pin(stroke)
  return [solid(drop), hole(circle(12, 10, 2.5 - stroke / 2))]
}
