import { circle } from '../geometry'

// 分子：三个圆形原子 + 原子之间的化学键（键线从圆边起止）
export default ({ radius }) => [
  circle(12, 6.5, 2.5),
  circle(5.5, 17, 2.5),
  circle(18.5, 17, 2.5),
  'M10.68 8.63L6.82 14.88',
  'M13.32 8.63L17.18 14.88',
  'M8 17H16',
]
