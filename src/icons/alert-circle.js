import { ring } from '../marks'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 错误提示：圆 + 居中的感叹号
export default ({ radius }) => [
  ring(),
  'M12 7.5V12.5',
  dot(12, 16),
]

export const fill = () => [solid(ring()), knock(['M12 7.5V12.5', dot(12, 16)])]
