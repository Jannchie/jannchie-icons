import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// USB Type-A 接口：长方形外壳 + 上半边的舌片
export default ({ radius }) => [
  rounded([[3.5, 8.5], [20.5, 8.5], [20.5, 15.5], [3.5, 15.5]], Math.min(radius, 1.5)),
  rounded([[6.5, 10.5], [17.5, 10.5], [17.5, 12.5], [6.5, 12.5]], Math.min(radius, 0.5)),
]

// 实心：外壳一块，挖掉舌片的轮廓（舌片留成实心）
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 8.5], [20.5, 8.5], [20.5, 15.5], [3.5, 15.5]], Math.min(radius, 1.5))),
  knock(rounded([[6.5, 10.5], [17.5, 10.5], [17.5, 12.5], [6.5, 12.5]], Math.min(radius, 0.5))),
]
