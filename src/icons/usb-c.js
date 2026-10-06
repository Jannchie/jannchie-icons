import { rounded } from '../geometry'

// USB Type-C 接口：两头全圆的跑道形 + 中间的舌片
export default ({ radius }) => [
  rounded([[3, 8.5], [21, 8.5], [21, 15.5], [3, 15.5]], 3.5),
  'M7.5 12H16.5',
]
