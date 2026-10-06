import { ring } from '../marks'

// 灯（电路符号）：圆 + 内接的叉
export default ({ radius }) => [
  ring(),
  'M5.64 5.64L18.36 18.36',
  'M18.36 5.64L5.64 18.36',
]
