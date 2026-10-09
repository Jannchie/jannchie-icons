import { rounded } from '../geometry'

// 空格 ␣：开口朝上的浅槽（y 9.5–14.5，上下居中）
export default ({ radius }) => [
  rounded([[3.5, 9.5], [3.5, 14.5], [20.5, 14.5], [20.5, 9.5]], Math.min(radius, 1.5), false),
]
