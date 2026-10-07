import { circle, rounded } from '../geometry'

// 证件卡：横向圆角卡片（2.5–21.5 × 5.5–18.5），左半边一个头像（头 + 肩），右半边两行字
export default ({ radius }) => [
  rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5)),
  circle(8.5, 10.5, 2),
  'M5 16A3.5 3 0 0 1 12 16',
  'M14.5 10.5H18.5',
  'M14.5 13.5H17.5',
]
