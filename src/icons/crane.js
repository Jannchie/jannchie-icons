import { rounded } from '../geometry'
import { solid } from '../solid'

// 塔吊（建筑起重机，不是鸟）：两根竖杆（7.5 / 10.5）组成的塔身，中间一条之字形的斜撑，立在一段地面线上（5–13 × 20.5）；
// 塔顶一根横贯的吊臂（2.5–21.5 × 7.5），塔尖 (9, 3) 往两头各拉一根拉索（左到 4.5、右到吊臂端头 21.5）；
// 吊臂右段垂下一根吊绳（18.5），吊着一个货箱（16.5–20.5 × 13.5–17.5）
// 横吊臂 + 三角拉索 + 吊着的货是塔吊的记号
const mast = 'M7.5 20.5V7.5M10.5 20.5V7.5'
const brace = 'M7.5 10.5L10.5 13.5L7.5 16.5L10.5 19.5'
const jib = 'M2.5 7.5H21.5'
const ties = 'M4.5 7.5L9 3L21.5 7.5'
const rope = 'M18.5 7.5V13.5'
const ground = 'M5 20.5H13'
const load = radius => rounded([[16.5, 13.5], [20.5, 13.5], [20.5, 17.5], [16.5, 17.5]], Math.min(radius, 0.5))

export default ({ radius }) => [mast, brace, jib, ties, rope, load(radius), ground]

// 实心：塔身填成一根实心的柱子（斜撑不挖：挖穿以后碎成一串小三角，小尺寸下很乱），货箱一块；
// 吊臂、拉索、吊绳、地面线照旧是线
export const fill = ({ radius }) => [
  solid('M7.5 7.5H10.5V20.5H7.5Z'),
  jib,
  ties,
  rope,
  solid(load(radius)),
  ground,
]
