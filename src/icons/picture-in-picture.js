import { rounded } from '../geometry'

// 画中画：大框 + 右下角小框
export default ({ radius }) => [
  rounded([[2.5, 4.5], [21.5, 4.5], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2.5)),
  rounded([[12.5, 11.5], [18.5, 11.5], [18.5, 16.5], [12.5, 16.5]], Math.min(radius, 1)),
]
