import { rounded } from '../geometry'

// 内存条：长条 PCB + 三颗颗粒 + 底部金手指（中间留一个防呆缺口）
export default ({ radius }) => [
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 15.5], [2.5, 15.5]], Math.min(radius, 1)),
  rounded([[5, 9], [8, 9], [8, 13], [5, 13]], Math.min(radius, 0.5)),
  rounded([[10.5, 9], [13.5, 9], [13.5, 13], [10.5, 13]], Math.min(radius, 0.5)),
  rounded([[16, 9], [19, 9], [19, 13], [16, 13]], Math.min(radius, 0.5)),
  'M5 15.5V18',
  'M7.5 15.5V18',
  'M10 15.5V18',
  'M14 15.5V18',
  'M16.5 15.5V18',
  'M19 15.5V18',
]
