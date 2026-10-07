import { block, hull, turret } from '../navy'

// 驱逐舰：短一些（3.5–20.5）、甲板 16.5 更低；前甲板一座小炮（15.5–17），细长低矮的上层建筑（6.5–12.5，下层高 3）前端升起一截舰桥，桅杆在舰桥上
const deck = 16.5
export default ({ radius }) => [
  hull(3.5, 20.5, deck, radius),
  ...turret(15.5, deck, 1, radius, { w: 1.5, len: 2 }),
  block(deck, [[6.5, 13.5], [10.5, 13.5], [10.5, 11.5], [12.5, 11.5]], radius),
  'M11.5 11.5V8',
]
