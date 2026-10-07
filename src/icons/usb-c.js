import { rounded } from '../geometry'

// USB Type-C 接口：两头全圆的跑道形（高 6，中心 y = 11.5）+ 中间的舌片；横线都落在 .5 上
export default ({ radius }) => [
  rounded([[3, 8.5], [21, 8.5], [21, 14.5], [3, 14.5]], 3),
  'M7.5 11.5H16.5',
]
