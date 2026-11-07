import { crisp, rounded } from '../geometry'
import { dot, GROUND, groundLine } from '../scene'
import { hole, knock, solid } from '../solid'

// 谷仓：折线形（复折式）屋顶，草料窗一个点，大门带 X 形斜撑；屋顶折角不随全局圆角，门框保持直角好让斜撑顶进角里
const body = radius => [[5.5, GROUND, 0], [5.5, 10.5, crisp(radius)], [7.5, 6.5, crisp(radius)], [12, 4.5], [16.5, 6.5, crisp(radius)], [18.5, 10.5, crisp(radius)], [18.5, GROUND, 0]]
const hayDoor = dot(12, 8.5)
const brace = { d: 'M9.5 12.5L14.5 20.5M14.5 12.5L9.5 20.5', thin: true }

export default ({ radius }) => [
  groundLine,
  rounded(body(radius), radius, false),
  hayDoor,
  rounded([[9.5, GROUND], [9.5, 12.5], [14.5, 12.5], [14.5, GROUND]], 0, false),
  brace,
]

// 实心：谷仓一整块（底下两个角贴着地平线，不收圆角），草料窗挖成圆点（尖角模式下也是圆的）；
// 大门挖空（洞外扩半个线宽后是门框的中心线），X 形斜撑照旧是细线、顶进门洞的四个角；地平线最后画
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    solid(rounded(body(radius), radius)),
    knock({ ...hayDoor, round: true }),
    hole(`M${9.5 + h} ${GROUND}V${12.5 + h}H${14.5 - h}V${GROUND}Z`),
    brace,
    groundLine,
  ]
}
