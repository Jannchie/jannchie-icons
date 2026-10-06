import { rounded } from '../geometry'
import { rotate } from '../transform'

// 断开链接：两个链环上下分开（与 link 同样先竖直画再转 30°），中间两侧各一道断裂短线
const ring = cy => rounded([[9, cy - 4.25], [15, cy - 4.25], [15, cy + 4.25], [9, cy + 4.25]], 3)

export default () => [
  rotate(ring(6.75), 30),
  rotate(ring(17.25), 30),
  rotate('M6.5 12L8.5 12', 30),
  rotate('M15.5 12L17.5 12', 30),
]
