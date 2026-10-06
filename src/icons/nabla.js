import { crisp, rounded } from '../geometry'

// 梯度 ∇：尖朝下的三角
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [12, 19.5]], crisp(radius)),
]
