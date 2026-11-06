import { body, fillParts, plain, WAIST, waist } from '../briefcase'
import { knock } from '../solid'

// 公文包：箱体 + 提手 + 腰线
export default ({ radius, stroke }) => [...plain(radius, stroke), waist(stroke)]

// 实心：箱体一块，挖掉腰线；腰线两端各缩一个线宽，左右留一道墙，上下两半连成一块（和日历的表头线一样）
export const fill = ({ radius, stroke }) => {
  const { body: solidBody, lines } = fillParts(radius, stroke)
  const [[l], [r]] = body(stroke)
  return [...solidBody, knock(`M${l + stroke} ${WAIST}H${r - stroke}`), ...lines]
}
