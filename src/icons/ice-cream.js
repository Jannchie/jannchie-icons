import { rounded } from '../geometry'

// 冰淇淋：半圆球 + 尖底蛋筒 + 蛋筒上一道横纹
export default ({ radius }) => [
  'M6.5 11A5.51 5.51 0 0 1 17.5 11Z',
  rounded([[6.5, 11], [12, 21.5], [17.5, 11]], Math.min(radius, 1), false),
  'M8.6 15H15.4',
]
