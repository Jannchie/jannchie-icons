import { ring } from '../marks'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 信息：圆 + i（竖笔落在中轴 12 上）
export default ({ radius }) => [
  ring(),
  dot(12, 8),
  'M12 11V16.5',
]

export const fill = () => [solid(ring()), knock([dot(12, 8), 'M12 11V16.5'])]
