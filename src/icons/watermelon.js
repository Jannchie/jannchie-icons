import { dot } from '../scene'

// 西瓜（一瓣）：半圆瓜瓣 + 瓜皮线 + 三颗瓜子
export default ({ radius }) => [
  'M3 7.5A9 9 0 0 0 21 7.5Z',
  'M5.5 7.5A6.5 6.5 0 0 0 18.5 7.5',
  dot(9, 10.5),
  dot(12, 12.5),
  dot(15, 10.5),
]
