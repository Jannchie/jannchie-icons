import { block, hull, turret } from '../navy'

// 战列舰：最长的船体（2–22.5）、甲板 15.5；前甲板一座炮塔（19.5–22），后面一座背负式炮塔（14.5–16.5，墩子高 5、炮管越过前炮塔），
// 后甲板一座朝后的炮塔（3–5.5）；中部是高大的两级塔式舰桥（8.5–11.5），顶上一根桅杆；相邻的东西之间都隔 3（粗字重下还空 1，不会被拥挤检测调细）
const deck = 15.5
export default ({ radius }) => [
  hull(2, 22.5, deck, radius),
  ...turret(19.5, deck, 1, radius, { len: 1.75 }),
  ...turret(14.5, deck, 1, radius, { w: 2, h: 5, len: 3 }),
  ...turret(5.5, deck, -1, radius),
  block(deck, [[8.5, 12.5], [9.5, 12.5], [9.5, 8.5], [11.5, 8.5]], radius),
  'M10.5 8.5V4.5',
]
