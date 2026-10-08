import { rounded } from '../geometry'

// USB Type-C 接口：两头全圆的跑道形（高 6，中心 y = 12）+ 中间的舌片
export default ({ radius }) => [
  rounded([[3, 9], [21, 9], [21, 15], [3, 15]], 3),
  'M7.5 12H16.5',
]
