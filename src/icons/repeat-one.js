import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 单曲循环：列表循环 + 中间一个 45° 起笔的「1」
export default ({ radius }) => [
  rounded([[4, 12], [4, 7], [20, 7]], radius, false),
  rounded(arrow(20, 7, 'right'), crisp(radius), false),
  rounded([[20, 12], [20, 17], [4, 17]], radius, false),
  rounded(arrow(4, 17, 'left'), crisp(radius), false),
  rounded([[11, 11], [12.5, 9.5], [12.5, 14.5]], crisp(radius), false),
]
