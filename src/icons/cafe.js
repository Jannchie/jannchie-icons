import { crisp, rounded } from '../geometry'
import { doorway, GROUND, groundLine, opening } from '../scene'
import { knock, solid } from '../solid'

// 咖啡馆：store 那样的 45° 梯形遮阳棚，但矮一格（3.5–20.5 × 5.5–8.5），墙 5.5 / 18.5；
// 墙上正中挂一只咖啡杯（杯身 8.5–13.5 × 10.5–14.5，右边一只小把手，杯连把手居中），门在杯子下面（3 宽、顶在 16.5）。
// 遮阳棚说明是临街的小店，杯子说明卖的是咖啡：只有遮阳棚就是 store
const awning = radius => rounded([[3.5, 8.5, crisp(radius)], [6.5, 5.5], [17.5, 5.5], [20.5, 8.5, crisp(radius)]], radius)
const walls = [`M5.5 8.5V${GROUND}`, `M18.5 8.5V${GROUND}`]
const cup = [
  'M8.5 10.5H13.5V13A1.5 1.5 0 0 1 12 14.5H10A1.5 1.5 0 0 1 8.5 13Z',
  'M13.5 11.5H14.5A1 1 0 0 1 14.5 13.5H13.414', // 下端接在杯底圆角上
]

export default ({ radius }) => [
  groundLine,
  awning(radius),
  ...walls,
  ...cup,
  rounded(opening(12, 3, 3.5), radius, false),
]

// 实心：遮阳棚、店面各一块，棚底边整条挖穿分开（同 store）；杯子挖出轮廓（杯身留实心），门挖空；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(awning(radius)),
  solid(`M5.5 8.5H18.5V${GROUND}H5.5Z`),
  knock([`M${3.5 - stroke} 8.5H${20.5 + stroke}`, ...cup]),
  doorway(12, 3, 3.5, radius, stroke),
  groundLine,
]
