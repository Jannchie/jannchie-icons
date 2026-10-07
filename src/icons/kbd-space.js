import { rounded } from '../geometry'

// 空格 ␣：开口朝上的浅槽
export default ({ radius }) => [
  rounded([[3.5, 10.5], [3.5, 15.5], [20.5, 15.5], [20.5, 10.5]], Math.min(radius, 1.5), false),
]
