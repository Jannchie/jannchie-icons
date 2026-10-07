import { circle, crisp, rounded } from '../geometry'

// 演示：白板 + 板上的折线 + 立杆和支脚（立杆落在 .5 上，偏左半格）
export default ({ radius, stroke }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 15.5], [3.5, 15.5]], Math.min(radius, 1.5)),
  'M7 12L10.5 8.5L13 11L17 7',
  'M11.5 15.5V18.5',
  'M11.5 18.5L8 21.5',
  'M11.5 18.5L15 21.5',
]
