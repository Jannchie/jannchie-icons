import { GAP } from '../clearance'
import { clear, solid } from '../solid'

// 管道（弯头）：一段竖管（4.5–9.5）往下弯成横管（15.5–20.5）——外壁弯半径 7、内壁弯半径 2，同心于 (11.5, 13.5)；
// 两个管口用短线封住（顶上 2.5、右边 21.5），竖管、横管上各套一圈法兰（两头伸出管壁 1）
const outer = 'M4.5 2.5V13.5A7 7 0 0 0 11.5 20.5H21.5'
const inner = 'M9.5 2.5V13.5A2 2 0 0 0 11.5 15.5H21.5'
const flanges = ['M3.5 6.5H10.5', 'M17.5 14.5V21.5']

export default () => [
  outer,
  inner,
  'M4.5 2.5H9.5',
  'M21.5 15.5V20.5',
  ...flanges,
]

// 实心：管身一整块（外壁、内壁和两个管口围成），两圈法兰照旧是线，管身在法兰两侧让出 GAP 的缝——法兰读作套在管上的一圈
export const fill = () => [
  solid(`${outer}V15.5H11.5A2 2 0 0 1 9.5 13.5V2.5Z`),
  clear(flanges, GAP),
  ...flanges,
]
