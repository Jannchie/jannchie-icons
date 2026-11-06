import { circle, crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 演示：白板 + 板上的折线 + 正中的立杆和对称支脚，整体上下居中
export default ({ radius, stroke }) => [
  rounded([[3.5, 3], [20.5, 3], [20.5, 15], [3.5, 15]], Math.min(radius, 1.5)),
  'M7 11.5L10.5 8L13 10.5L17 6.5',
  'M12 15V18',
  'M12 18L8.5 21',
  'M12 18L15.5 21',
]

// 实心：白板一块，挖掉折线；立杆和支脚照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 3], [20.5, 3], [20.5, 15], [3.5, 15]], Math.min(radius, 1.5))),
  knock('M7 11.5L10.5 8L13 10.5L17 6.5'),
  'M12 15V18',
  'M12 18L8.5 21',
  'M12 18L15.5 21',
]
