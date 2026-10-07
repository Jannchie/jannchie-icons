import { rounded } from '../geometry'

// USB Type-A 接口：长方形外壳 + 上半边的舌片
export default ({ radius }) => [
  rounded([[3.5, 8.5], [20.5, 8.5], [20.5, 15.5], [3.5, 15.5]], Math.min(radius, 1.5)),
  rounded([[6.5, 10.5], [17.5, 10.5], [17.5, 12.5], [6.5, 12.5]], Math.min(radius, 0.5)),
]
