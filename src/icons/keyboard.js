import { rounded } from '../geometry'
import { dot } from '../scene'

// 键盘：外框 + 两排按键点 + 空格键
// 外框下移半格，空格键和两排按键间距都是 3；每排 5 个点等距 3、以 12 为中心左右对称
const KEYS = [6, 9, 12, 15, 18]

export default ({ radius }) => [
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2)),
  ...[9.5, 12.5].flatMap(y => KEYS.map(x => dot(x, y, 1.75))),
  'M8 15.5H16',
]
