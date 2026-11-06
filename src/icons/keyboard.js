import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 键盘：外框 + 两排按键点 + 空格键
// 空格键和两排按键间距都是 3；每排 5 个点等距 3、以 12 为中心左右对称
const KEYS = [6, 9, 12, 15, 18]

export default ({ radius }) => [
  rounded([[2.5, 6], [21.5, 6], [21.5, 18], [2.5, 18]], Math.min(radius, 2)),
  ...[9, 12].flatMap(y => KEYS.map(x => dot(x, y, 1.75))),
  'M8 15H16',
]

// 实心：键盘一块，按键点和空格键挖空
export const fill = ({ radius }) => [
  solid(rounded([[2.5, 6], [21.5, 6], [21.5, 18], [2.5, 18]], Math.min(radius, 2))),
  knock([...[9, 12].flatMap(y => KEYS.map(x => dot(x, y, 1.75))), 'M8 15H16']),
]
