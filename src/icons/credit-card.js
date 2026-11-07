import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 信用卡：圆角卡片 + 上方磁条线 + 左下一小段卡号线
export default ({ radius }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
  'M2.5 9.5H21.5',
  'M6 14.5H10',
]

// 实心：卡片一块，磁条线整条挖穿，卡片分成上面的磁条和下面的卡面两片；卡号线挖空
export const fill = ({ radius }) => [
  solid(rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5))),
  knock(['M0 9.5H24', 'M6 14.5H10']),
]
