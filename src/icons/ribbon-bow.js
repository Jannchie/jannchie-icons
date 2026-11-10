import { rounded } from '../geometry'
import { stacked } from '../solid'

// 蝴蝶结：中间一个小圆角方结（10.5–13.5 × 6.5–10.5），左右两片往外张开的环形翼（外缘墨迹固定在 2 / 22，线宽往里长），
// 下面垂两条斜向外的短飘带，带尾剪成燕尾；两条飘带的内沿在结的正下方交成一个尖
const knot = radius => rounded([[10.5, 6.5], [13.5, 6.5], [13.5, 10.5], [10.5, 10.5]], Math.min(radius, 1))
const wing = (s, radius, h) => rounded([[12 + s * 1.5, 7.5], [12 + s * (10 - h), 3.75], [12 + s * (10 - h), 13.25], [12 + s * 1.5, 9.5]], Math.min(radius, 2), false)
const tail = s => `M${12 + s * 1.5} 10.5L${12 + s * 7.5} 18.75L${12 + s * 4.5} 18L${12 + s * 3} 21.25L12 13.75`

export default ({ radius, stroke }) => {
  const h = stroke / 2
  return [knot(radius), wing(-1, radius, h), wing(1, radius, h), tail(-1), tail(1)]
}

// 实心：从后往前三层——飘带、两片翼、结，各自是完整的一块，后面一层沿前面一层让出 GAP 的缝
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return stacked(
    [`${tail(-1)}Z`, `${tail(1)}Z`],
    [`${wing(-1, radius, h)}Z`, `${wing(1, radius, h)}Z`],
    knot(radius),
  )
}
