import { ring } from '../marks'
import { knock, solid } from '../solid'

// 版权 ©：圆环 + 中间的 C
export default ({ radius }) => [
  ring(),
  'M14.5 9.75A3.25 3.25 0 1 0 14.5 14.25',
]

// 实心：圆盘一块，挖掉中间的 C
export const fill = () => [solid(ring()), knock('M14.5 9.75A3.25 3.25 0 1 0 14.5 14.25')]
