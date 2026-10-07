import { rounded } from '../geometry'

// 冰淇淋：半圆球 + 尖底蛋筒 + 蛋筒上一道横纹
export default ({ radius }) => [
  'M6.5 10.5A5.51 5.51 0 0 1 17.5 10.5Z',
  rounded([[6.5, 10.5], [12, 21.5], [17.5, 10.5]], Math.min(radius, 1), false),
  // 横纹两端正好落在蛋筒斜边上
  'M8.5 14.5H15.5',
]
