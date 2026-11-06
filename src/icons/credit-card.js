import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 信用卡：圆角卡片 + 上方磁条线 + 左下一小段卡号线
export default ({ radius }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
  'M2.5 9.5H21.5',
  'M6 14.5H10',
]

// 实心：卡片一块，挖掉磁条线和卡号线；磁条线两端各缩一个线宽，卡片不被切成两半
export const fill = ({ radius, stroke }) => [
  solid(rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5))),
  knock([`M${2.5 + stroke} 9.5H${21.5 - stroke}`, 'M6 14.5H10']),
]
