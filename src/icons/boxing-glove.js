import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, knock, solid } from '../solid'

// 拳击手套：圆鼓鼓的拳套（8.5–19.5，顶到 3.5，底边平直在 15.5）+ 左侧贴着拳套的大拇指（一个 D 形的鼓包，8.5–15.5 之间）+ 底下的护腕（8.5–17.5 × 15.5–20.5）
const mitt = 'M8.5 15.5V7.5C8.5 5 10.5 3.5 13 3.5C16.5 3.5 19.5 6 19.5 10C19.5 12.5 18.5 14.5 17.5 15.5Z'
const thumb = 'M8.5 8.5C6.5 8.5 4.5 9.5 4.5 12C4.5 14 6 15.5 8.5 15.5'
const cuff = radius => rounded([[8.5, 15.5, 0], [17.5, 15.5, 0], [17.5, 20.5], [8.5, 20.5]], Math.min(radius, 1.5))

export default ({ radius }) => [mitt, thumb, cuff(radius)]

// 实心：大拇指封口成一块，拳套在前，大拇指在拳套四周让出缝；护腕一块，和拳套的接缝整条挖穿
export const fill = ({ radius }) => [
  solid(`${thumb}Z`),
  clear(mitt, GAP),
  solid([mitt, cuff(radius)]),
  knock('M6.5 15.5H21.5'),
]
