import { block, hull, turret } from '../navy'

// 护卫舰：最小最简（4.5–19.5、甲板 16.5）；一块方正高大的上层建筑（7.5–13.5，隐身舰的样子）+ 一根桅杆，前甲板一门小炮（16.5–18）
const deck = 16.5
export default ({ radius }) => [
  hull(4.5, 19.5, deck, radius),
  ...turret(16.5, deck, 1, radius, { w: 1.5, len: 1.5 }),
  block(deck, [[7.5, 12.5], [13.5, 12.5]], radius),
  'M10.5 12.5V9',
]
