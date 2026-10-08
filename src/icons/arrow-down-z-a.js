import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { sortLetters } from './arrow-down-a-z'

// 按字母降序：arrow-down-a-z 的字母上下对调（上 Z 下 A），箭头不变
export default ({ radius }) => [
  'M6.5 4V20',
  rounded(arrow(6.5, 20, 'down', 3), crisp(radius), false),
  ...sortLetters('Z', 'A'),
]
