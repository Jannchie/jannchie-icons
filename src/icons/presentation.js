import { circle, crisp, rounded } from '../geometry'

// 演示：白板 + 板上的折线 + 正中的立杆和对称支脚，整体上下居中
export default ({ radius, stroke }) => [
  rounded([[3.5, 3], [20.5, 3], [20.5, 15], [3.5, 15]], Math.min(radius, 1.5)),
  'M7 11.5L10.5 8L13 10.5L17 6.5',
  'M12 15V18',
  'M12 18L8.5 21',
  'M12 18L15.5 21',
]
