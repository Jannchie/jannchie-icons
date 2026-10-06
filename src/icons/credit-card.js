import { rounded } from '../geometry'

// 信用卡：圆角卡片 + 上方磁条线 + 左下一小段卡号线
export default ({ radius }) => [
  rounded([[2.5, 5], [21.5, 5], [21.5, 19], [2.5, 19]], Math.min(radius, 2.5)),
  'M2.5 9.5H21.5',
  'M6 15H10',
]
