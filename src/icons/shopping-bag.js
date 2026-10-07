import { rounded } from '../geometry'

// 购物袋：上窄下宽的袋身 + 半圆提手
export default ({ radius }) => [
  rounded([[5, 7.5], [19, 7.5], [20, 20.5], [4, 20.5]], Math.min(radius, 1.5)),
  'M8.5 10.5V6.5A3.5 3.5 0 0 1 15.5 6.5V10.5',
]
