import { knock, solid } from '../solid'
import { gauge } from '../symbols'

// 计速器
export default ({ radius }) => gauge([12, 12], 2.3, radius)

// 实心：270° 的表盘弧沿底下的开口拉一道弦封口成一块，指针挖空
export const fill = ({ radius }) => {
  const [arc, needle] = gauge([12, 12], 2.3, radius)
  return [solid(`${arc}Z`), knock(needle)]
}
