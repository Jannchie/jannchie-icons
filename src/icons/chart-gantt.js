import { rounded } from '../geometry'

// 甘特图：左侧时间轴 + 三行左右错开的横条
export default ({ radius }) => [
  'M3.5 3V21',
  rounded([[6, 4.5], [13, 4.5], [13, 7.5], [6, 7.5]], Math.min(radius, 1)),
  rounded([[10, 10.5], [18, 10.5], [18, 13.5], [10, 13.5]], Math.min(radius, 1)),
  rounded([[14, 16.5], [20.5, 16.5], [20.5, 19.5], [14, 19.5]], Math.min(radius, 1)),
]
