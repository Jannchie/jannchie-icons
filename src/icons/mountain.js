import { GROUND } from '../scene'
import { solid } from '../solid'

// 山：两座山峰（左高右低）连成一条闭合轮廓，底边就是地平线；左峰尖 (9, 5)，右峰尖 (16, 10)，两峰之间的鞍部 (12.5, 12.5)
export default () => [
  `M2.5 ${GROUND}L9 5L12.5 12.5L16 10L21.5 ${GROUND}Z`,
]

// 实心：整座山
export const fill = () => [solid(`M2.5 ${GROUND}L9 5L12.5 12.5L16 10L21.5 ${GROUND}Z`)]
