import { rounded } from '../geometry'

// 俄罗斯方块：一个 T 形块（一整块轮廓 + 细线分成四格），格子 6 见方，居中摆放
export default ({ radius }) => [
  rounded([[3, 6], [21, 6], [21, 12], [15, 12], [15, 18], [9, 18], [9, 12], [3, 12]], Math.min(radius, 1)),
  { d: 'M9 6V12', thin: true },
  { d: 'M15 6V12', thin: true },
  { d: 'M9 12H15', thin: true },
]
