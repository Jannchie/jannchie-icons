import { rounded } from '../geometry'

// USB Type-A 接口：长方形外壳 + 上半边的舌片
export default ({ radius }) => [
  rounded([[3, 8], [21, 8], [21, 16], [3, 16]], Math.min(radius, 1.5)),
  rounded([[6, 10.5], [18, 10.5], [18, 12.5], [6, 12.5]], Math.min(radius, 0.5)),
]
