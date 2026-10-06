import { circle } from '../geometry'

// 炸弹：圆球 + 右上的引信口 + 弯曲的引信 + 火花
export default ({ radius }) => [
  circle(10.5, 14, 6.5),
  'M15.1 9.4L16.5 8',
  'M16.5 8C17.5 7 18.5 7 19 6',
  { d: 'M20.5 3.5L21.5 2.5', detail: true },
  { d: 'M21 6H22.25', detail: true },
  { d: 'M18.5 3.25V2', detail: true },
]
