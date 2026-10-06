import { check } from '../symbols'

// 双勾（已读）：两个勾左右错开 5，外框 3.5–20.5
export default () => [
  ...check([9.5, 12], 2),
  ...check([14.5, 12], 2),
]
