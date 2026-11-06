import { ring } from '../marks'
import { knock, solid } from '../solid'

// 圆圈 + 减号（横线过中心 12）
export default ({ radius }) => [
  ring(),
  'M8 12H16',
]

export const fill = () => [solid(ring()), knock('M8 12H16')]
