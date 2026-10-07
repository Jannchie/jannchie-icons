import { rounded } from '../geometry'

// 暗角：方框 + 内部椭圆
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)),
  'M6 12A6 4.5 0 0 1 18 12A6 4.5 0 0 1 6 12',
]
