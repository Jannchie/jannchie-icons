import { rounded } from '../geometry'

// 冰淇淋：半圆球 + 尖底蛋筒（9.5 到尖 20.5）+ 蛋筒上一道横纹；墨迹上下居中
export default ({ radius }) => [
  'M6.5 9.5A5.51 5.51 0 0 1 17.5 9.5Z',
  rounded([[6.5, 9.5], [12, 20.5], [17.5, 9.5]], Math.min(radius, 1), false),
  // 横纹两端正好落在蛋筒斜边上
  'M8.5 13.5H15.5',
]
