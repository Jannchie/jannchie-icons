import { circle, crisp, rounded } from '../geometry'

// 演示：白板 + 板上的折线 + 立杆和支脚
export default ({ radius, stroke }) => [
  rounded([[3, 3.5], [21, 3.5], [21, 15.5], [3, 15.5]], Math.min(radius, 1.5)),
  'M7 12L10.5 8.5L13 11L17 7',
  'M12 15.5V18.5',
  'M12 18.5L8.5 21.5',
  'M12 18.5L15.5 21.5',
]
