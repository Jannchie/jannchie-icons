import { rounded } from '../geometry'

// 牛奶（纸盒）：顶上的封口 + 尖顶盒身 + 肩线 + 一道波浪标签
export default ({ radius }) => [
  rounded([[8.5, 5.5], [8.5, 2.5], [15.5, 2.5], [15.5, 5.5]], Math.min(radius, 1), false),
  rounded([[8.5, 5.5], [15.5, 5.5], [18, 9.5], [18, 21], [6, 21], [6, 9.5]], Math.min(radius, 1.5)),
  'M6 9.5H18',
  'M6 15C8 14 10 16 12 15C14 14 16 16 18 15',
]
