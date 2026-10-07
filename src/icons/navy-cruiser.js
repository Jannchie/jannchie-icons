import { block, hull, turret } from '../navy'

// 巡洋舰：中等船长（2.5–21.5）、甲板 15.5；前后各一座炮塔（16.5–19、4–6.5），中间一座两级舰桥（9.5–13.5，比战列舰矮），桅杆在舰桥上
const deck = 15.5
export default ({ radius }) => [
  hull(2.5, 21.5, deck, radius),
  ...turret(16.5, deck, 1, radius),
  ...turret(6.5, deck, -1, radius),
  block(deck, [[9.5, 12.5], [10.5, 12.5], [10.5, 9.5], [12.5, 9.5], [12.5, 12.5], [13.5, 12.5]], radius),
  'M11.5 9.5V6',
]
