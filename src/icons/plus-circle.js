import { ring } from '../marks'
import { knock, solid } from '../solid'

// 圆圈 + 居中的加号
export default ({ radius }) => [
  ring(),
  'M12 8V16',
  'M8 12H16',
]

export const fill = () => [solid(ring()), knock(['M12 8V16', 'M8 12H16'])]
